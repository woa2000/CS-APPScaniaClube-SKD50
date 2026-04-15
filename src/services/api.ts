import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { trackError, trackEvent } from './telemetry'

// const api = axios.create({
//   baseURL: 'https://scania-clube-dev.azurewebsites.net/api'
// })

// const api = axios.create({
//   baseURL: 'https://scania-clube-homolog.azurewebsites.net/api'
// })

// const api = axios.create({
//   baseURL: 'https://90c3-168-227-51-24.ngrok-free.app/api'
// })

// const api = axios.create({
//   baseURL: 'https://scania-clube-homolog.azurewebsites.net/api'
// })

const api = axios.create({
  baseURL: 'https://scania-clube.azurewebsites.net/api',
  timeout: 30000
})

type TokensUpdater = (accessToken: string, refreshToken?: string | null) => Promise<void>
type AuthGetter = () => Promise<string | null>
type SessionExpiredHandler = () => Promise<void>

interface AuthInterceptorHandlers {
  getAccessToken: AuthGetter
  getRefreshToken: AuthGetter
  onTokensUpdated: TokensUpdater
  onSessionExpired: SessionExpiredHandler
}

interface RefreshTokenResponse {
  token?: string
  accessToken?: string
  refreshToken?: string
}

interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

let authHandlers: AuthInterceptorHandlers | null = null
let isRefreshingToken = false
let pendingRequests: Array<(token: string | null) => void> = []
const requestStartTimes = new WeakMap<object, number>()

function flushPendingRequests(token: string | null) {
  pendingRequests.forEach(resolve => resolve(token))
  pendingRequests = []
}

async function requestRefreshToken(
  accessToken: string | null,
  refreshToken: string
): Promise<RefreshTokenResponse | null> {
  const refreshEndpoints = ['auth/refresh', 'auth/refresh-token', 'auth/refreshToken']

  for (const endpoint of refreshEndpoints) {
    try {
      const response = await axios.post(
        `${api.defaults.baseURL}/${endpoint}`,
        { refreshToken },
        {
          timeout: 30000,
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined
        }
      )

      return response.data as RefreshTokenResponse
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status && axiosError.response.status < 500) {
        continue
      }
    }
  }

  return null
}

export function configureAuthInterceptors(handlers: AuthInterceptorHandlers) {
  authHandlers = handlers
}

api.interceptors.request.use(config => {
  requestStartTimes.set(config as object, Date.now())
  return config
})

api.interceptors.response.use(
  response => {
    const requestConfig = response.config as RetryableRequestConfig
    const startedAt = requestStartTimes.get(response.config as object)
    const durationMs = startedAt ? Date.now() - startedAt : null

    trackEvent('api_success', {
      method: requestConfig.method,
      url: requestConfig.url,
      status: response.status,
      durationMs
    })

    return response
  },
  async error => {
    const originalRequest = error?.config as RetryableRequestConfig | undefined
    const isUnauthorized = error?.response?.status === 401
    const startedAt = originalRequest
      ? requestStartTimes.get(originalRequest as object)
      : null
    const durationMs = startedAt ? Date.now() - startedAt : null

    trackError('api_failure', {
      method: originalRequest?.method,
      url: originalRequest?.url,
      status: error?.response?.status,
      code: error?.code,
      durationMs
    })

    if (
      isUnauthorized &&
      originalRequest &&
      !originalRequest._retry &&
      authHandlers
    ) {
      const currentHandlers = authHandlers
      originalRequest._retry = true

      if (isRefreshingToken) {
        const queuedToken = await new Promise<string | null>(resolve => {
          pendingRequests.push(resolve)
        })

        if (!queuedToken) {
          return Promise.reject(error)
        }

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${queuedToken}`
        }

        return api(originalRequest)
      }

      isRefreshingToken = true

      try {
        const [storedAccessToken, storedRefreshToken] = await Promise.all([
          currentHandlers.getAccessToken(),
          currentHandlers.getRefreshToken()
        ])

        if (!storedRefreshToken) {
          await currentHandlers.onSessionExpired()
          flushPendingRequests(null)
          return Promise.reject(error)
        }

        const refreshedTokens = await requestRefreshToken(storedAccessToken, storedRefreshToken)
        const newAccessToken = refreshedTokens?.token ?? refreshedTokens?.accessToken ?? null
        const newRefreshToken = refreshedTokens?.refreshToken ?? storedRefreshToken

        if (!newAccessToken) {
          await currentHandlers.onSessionExpired()
          flushPendingRequests(null)
          return Promise.reject(error)
        }

        await currentHandlers.onTokensUpdated(newAccessToken, newRefreshToken)
        flushPendingRequests(newAccessToken)

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`
        }

        return api(originalRequest)
      } catch (refreshError) {
        await currentHandlers.onSessionExpired()
        flushPendingRequests(null)
        return Promise.reject(refreshError)
      } finally {
        isRefreshingToken = false
      }
    }

    const isTimeout = error?.code === 'ECONNABORTED'
    const isOffline = error?.message === 'Network Error'

    if (!error.response) {
      return Promise.reject({
        ...error,
        isHandledError: true,
        userMessage: isTimeout
          ? 'A requisicao excedeu o tempo limite. Tente novamente.'
          : isOffline
            ? 'Sem conexao com a internet. Verifique sua rede.'
            : 'Nao foi possivel conectar ao servidor. Tente novamente.'
      })
    }

    return Promise.reject(error)
  }
)

export default api
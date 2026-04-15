import axios from 'axios'

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

api.interceptors.response.use(
  response => response,
  error => {
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
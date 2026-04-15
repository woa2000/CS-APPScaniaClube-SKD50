import { Alert } from 'react-native'
import api from '../../services/api'
import { singInService } from '../../services/auth'

jest.mock('../../services/api', () => ({
  post: jest.fn()
}))

jest.mock('i18next', () => ({
  t: (key: string) => key
}))

describe('singInService', () => {
  it('returns token and user when login succeeds', async () => {
    const mockedResponse = {
      data: {
        token: 'token-123',
        refreshToken: 'refresh-123',
        user: {
          id: '1',
          nome: 'User Test',
          cpf: '00000000000',
          email: 'user@test.com',
          dataNascimento: '1990-01-01',
          celular: '11999999999',
          idioma: 'pt',
          policyAccepted: true,
          dateAccepted: '2026-01-01'
        },
        fileServer: 'https://files.example.com',
        error: null
      }
    }

    ;(api.post as jest.Mock).mockResolvedValueOnce(mockedResponse)

    const result = await singInService('00000000000', '123456')

    expect(result.token).toBe('token-123')
    expect(result.refreshToken).toBe('refresh-123')
    expect(result.user?.id).toBe('1')
    expect(result.error).toBeNull()
  })

  it('returns error payload and alerts when login fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {})

    ;(api.post as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          modelResult: {
            message: [{ message: 'Credenciais invalidas' }]
          }
        }
      }
    })

    const result = await singInService('00000000000', 'senha-invalida')

    expect(alertSpy).toHaveBeenCalled()
    expect(result.token).toBeNull()
    expect(result.user).toBeNull()
    expect(result.error).toBeTruthy()

    alertSpy.mockRestore()
  })
})

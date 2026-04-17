import api from '../services/api';
import {JWT} from '../interfaces/interfaces';
import { Alert } from 'react-native';
import { t } from 'i18next';
import { trackError, trackEvent } from './telemetry';

export function  singInService(username : string, password: string): Promise<JWT> {
  const data = { 
    userName : username,
    password : password
  }
  return new Promise(resolve => {
    api.post("auth/login", data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      const data = response.data as JWT;
      const refreshTokenData = response.data as {
        refreshToken?: string | null,
        refresh_token?: string | null
      };
      console.log('jwt ->',  data);
      
      trackEvent('auth_login_success', {
        hasUser: Boolean(data.user?.id)
      })
      resolve({
        token : data.token,
        refreshToken: refreshTokenData.refreshToken ?? refreshTokenData.refresh_token ?? null,
        user : {
          id: data.user?.id,
          nome : data.user?.nome,
          cpf : data.user?.cpf,
          email : data.user?.email,
          dataNascimento: data.user?.dataNascimento,
          celular : data.user?.celular,
          imgPerfil : data.user?.imgPerfil,
          idioma : data.user?.idioma,
          policyAccepted: true, //data.user?.policyAccepted,
          dateAccepted: data.user?.dateAccepted
        },
        fileServer: data.fileServer,
        error: data.error
      }) 
    })
    .catch((err) => {
      const handledMessage = err?.userMessage as string | undefined;
      const apiMessage = err?.response?.data?.modelResult?.message?.[0]?.message as string | undefined;
      const fallbackMessage = t('Nao foi possivel realizar login. Tente novamente.');

      trackError('auth_login_failed', {
        status: err?.response?.status,
        message: handledMessage ?? apiMessage ?? fallbackMessage
      })

      Alert.alert('', handledMessage ?? t(`${apiMessage ?? fallbackMessage}`))
      resolve({
        token : null,
        refreshToken: null,
        user: null,
        fileServer: null,
        error: err?.response?.data ?? handledMessage ?? fallbackMessage
      })
    });
  })      
}
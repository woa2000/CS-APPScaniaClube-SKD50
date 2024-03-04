import api from '../services/api';
import {JWT} from '../interfaces/interfaces';
import { Alert } from 'react-native';
import { t } from 'i18next';

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
      console.log('jwt ->',  data);
      resolve({
        token : data.token,
        user : {
          id: data.user?.id,
          nome : data.user?.nome,
          cpf : data.user?.cpf,
          email : data.user?.email,
          dataNascimento: data.user?.dataNascimento,
          celular : data.user?.celular,
          imgPerfil : data.user?.imgPerfil,
          idioma : data.user?.idioma,
        },
        fileServer: data.fileServer,
        error: data.error
      }) 
    })
    .catch((err) => {
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
      resolve({
        token : null,
        user: null,
        fileServer: null,
        error: err.response.data
      })
    });
  })      
}
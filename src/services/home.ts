import api from '../services/api';
import { HomeObj } from '../interfaces/interfaces';
import { Alert } from 'react-native';
import { t } from 'i18next';

export function  getHome(userId: string): Promise<HomeObj> {
  return new Promise(resolve => {        
    api.get("home?userId=" + userId)
    .then((response) => {
      const data = response.data as HomeObj;
      resolve({
        banners: data.banners,
        likedActivities: data.likedActivities
      }) 
    })
    .catch((err) => {
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })     
}

type ExternalLinkResponse = {
  link?: string
  url?: string
  externalLink?: string
  value?: string
}

export function getExternalActivityLink(): Promise<string> {
  return new Promise(resolve => {
    api.get('Activitys/GetLinkExterno')
      .then((response) => {
        const data = response.data as string | ExternalLinkResponse

        if (typeof data === 'string') {
          resolve(data)
          return
        }

        resolve(data.link ?? data.url ?? data.externalLink ?? data.value ?? '')
      })
      .catch((err) => {
        console.error('Ops! ocorreu um erro' + err)
        Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
        resolve('')
      })
  })
}
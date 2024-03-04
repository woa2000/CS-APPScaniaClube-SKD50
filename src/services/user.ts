import { Alert } from 'react-native';
import api from './api'
import { t } from 'i18next';

export function editProfileImage(userId: string, image: any) {
  
  let fd = new FormData();
  fd.append('image', image)

  return new Promise(resolve => {
    api.put(`auth/EditProfileImage?userId=${userId}`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data)
      resolve(response.data)
    })
    .catch((err) => {
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
      resolve(err.response.data)
    });
  })
}

export function removeProfile(userId: string) {
  return new Promise(resolve => {
    api.post(`auth/Remove?UserId=${userId}`)
    .then((response) => {
      resolve({success: true})
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}

export function editLanguage(userId: string | undefined,  language: string) {
  return new Promise(resolve => {
    api.put(`auth/EditLanguage?userId=${userId}&language=${language}`)
    .then(response => {
      console.log('success ->', response.data)
      resolve(response.data)
    })
    .catch((err) => {
      console.log('erro ->', err.response.data)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
      resolve(err.response.data)
    });
  })
}
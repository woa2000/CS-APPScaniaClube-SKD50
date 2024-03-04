import api from './api'
import { 
  Activity,
  ActivityPage,
  BeautyCenterSchedule,
  ModelResult,
  Professional,
  ScheduleActivity,
} from '../interfaces/interfaces';
import { Alert } from 'react-native';
import { t } from 'i18next';


export function getBeautyCenterActivitys(userId: string, type: string) : Promise<ActivityPage> {
  return new Promise(resolve => {
    api.get('Activitys/GetActivityPage?type=' + type + '&userId=' + userId)
    .then((response) => {
      const data = response.data as ActivityPage
      resolve({
        activities: data.activities,
        lastReservations: data.lastReservations,
      })
    })
    .catch((err) => {
      console.log(err.response)
      console.error('Ops! Ocorreu um erro' + err)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
    })
  })
}

export function getBeautyCenterActivityWithLike(id: string, userId: string) : Promise<Activity> {
  return new Promise(resolve => {
    api.get('Activitys/GetActivityWithUserLiked?id=' + id + '&userId=' + userId)
    .then((response) => {
      const data = response.data as Activity
      resolve({
        id: data.id,
        description: data.description,
        description_EN: data.description_EN,
        image: data.image,
        icon: data.icon,
        isLiked: data.isLiked
      })
    })
    .catch((err) => {
      console.log(err.response)
      console.error('Ops! Ocorreu um erro' + err)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
    })
  })
}

export function getProviders(id: string) : Promise<Professional[]> {
  return new Promise(resolve => {
    api.get('Schedules/GetProviders?activityId=' + id)
    .then((response) => {
      const data = response.data as Professional[]
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response)
      console.error('Ops! Ocorreu um erro' + err)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
    })
  })
}

export function getSchedulesByProviders(activityId: string, date: string, providerId: string) : Promise<ScheduleActivity[]> {
  return new Promise(resolve => {
    api.get('Schedules/ListSchedulesByProviders?activityId=' + activityId + '&date='+ date + '&providerId=' + providerId)
    .then((response) => {
      const data = response.data as ScheduleActivity[]
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response)
      console.error('Ops! Ocorreu um erro' + err)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
    })
  })
}

export function bookingActivity(id: string): Promise<ModelResult> {    
  return new Promise(resolve => {   
    const data = {
      activityScheduleId: id
    }    
    api.post("Schedules/Create", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      const data = response.data as ModelResult;
      resolve(
        {
          success: data.success,
          modelResult: data.modelResult
        }
      )
    })
    .catch((err) => {
      console.log('erro ->', err.response.data)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
      const data = err.response.data as ModelResult;
      resolve(
        {
          success: data.success,
          modelResult: data.modelResult
        }
      )
    });
  })
}

export function cancelBookingActivity(id: string): Promise<ModelResult> {    
  return new Promise(resolve => {   
    api.delete("Schedules/Remove/" + id)
    .then((response) => {
      const data = response.data as ModelResult;
      resolve(
        {
          success: data.success,
          modelResult: data.modelResult
        }
      )
    })
    .catch((err) => {
      console.log('erro ->', err.response.data)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
      const data = err.response.data as ModelResult;
      resolve(
        {
          success: data.success,
          modelResult: data.modelResult
        }
      )
    });
  })
}

export function likeActivity(id: string, userId: string, isLiked: boolean): Promise<ModelResult> {
  return new Promise(resolve => {         
    const data = {
      activityId: id,
      userId: userId,
      isLiked: isLiked,
    }    
    api.post("Activitys/LikeActivity", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {            
      const data = response.data as ModelResult;
      resolve(
        {
          success: data.success,
          modelResult: data.modelResult
        }
      )
    })
    .catch((err) => {
      console.log('erro ->', err.response.data)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
      const data = err.response.data as ModelResult;
      resolve(
        {
          success: data.success,
          modelResult: data.modelResult
        }
      )
    });
  })
}

export function getScheduledUserAestheticCenter(userId: string): Promise<BeautyCenterSchedule[]> {
  return new Promise(resolve => {   
    api.get("Schedules/GetScheduledUserAestheticCenter?userId=" + userId)
    .then((response) => {
      const data = response.data as BeautyCenterSchedule[]
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}

export function getRecordUserAestheticCenter(userId: string): Promise<BeautyCenterSchedule[]> {
  return new Promise(resolve => {   
    api.get("Schedules/GetRecordUserAestheticCenter?userId=" + userId)
    .then((response) => {
      const data = response.data as BeautyCenterSchedule[]
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}

export function cancelBookingBeautyCenterReserve(id: string): Promise<ModelResult> {    
  return new Promise(resolve => {   
    api.delete("Schedules/Remove/" + id)
    .then((response) => {
      const data = response.data as ModelResult;
      resolve(
        {
          success: data.success,
          modelResult: data.modelResult
        }
      )
    })
    .catch((err) => {
      console.log('erro ->', err.response.data)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
      const data = err.response.data as ModelResult;
      resolve(
        {
          success: data.success,
          modelResult: data.modelResult
        }
      )
    });
  })
}
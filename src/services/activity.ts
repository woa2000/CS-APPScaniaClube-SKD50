import api from '../services/api';
import {
  Activity, 
  ActivityPage, 
  ScheduleDates, 
  ScheduleActivity, 
  ModelResult, 
  ActivitySchedule,
  GraphicData
} from '../interfaces/interfaces';
import { Alert } from 'react-native';
import { t } from 'i18next';

export function getActivityPage(userId: string, type: string): Promise<ActivityPage> {
  return new Promise(resolve => {        
    api.get("Activitys/GetActivityPage?type=" + type + "&userId=" + userId)
    .then((response) => {
      const data = response.data as ActivityPage;
      console.log('activities ->', data);
      resolve({
        activities: data.activities,
        lastReservations: data.lastReservations,
      }) 
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })     
}

export function getActivity(id: string, userid: string): Promise<Activity> {
  return new Promise(resolve => {        
    api.get("Activitys/GetActivityWithUserLiked?id=" + id + "&userId=" + userid)
    .then((response) => {
      const data = response.data as Activity;
      console.log('activities like ->', data);
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
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })     
}

export function getDateActivity(id: string,): Promise<ScheduleDates> {
  return new Promise(resolve => {        
    api.get("Schedules/GetAllDates?activityId=" + id)
    .then((response) => {
      const data = response.data as ScheduleDates;
      resolve({
        dates: data.dates,
      }) 
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })     
}

export function getScheduleActivity(id: string, date: string): Promise<ScheduleActivity[]> {
  return new Promise(resolve => {        
    api.get("Schedules/ListSchedules?activityId=" + id + "&date=" + date)
    .then((response) => {
      const data = response.data as ScheduleActivity[];
      resolve(data) 
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
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

export function getScheduledUserActvities(userId: string): Promise<ActivitySchedule[]> {
  return new Promise(resolve => { 
    api.get("Schedules/GetScheduledUserActvities?userId=" + userId)
    .then((response) => {    
      const data = response.data as ActivitySchedule[];
        resolve(data) 
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}

export function getRecordUserSchedules(userId: string): Promise<ActivitySchedule[]> {
  return new Promise(resolve => { 
    api.get("Schedules/GetRecordUserSchedules?userId=" + userId)
    .then((response) => {   
      const data = response.data as ActivitySchedule[];
      resolve(data) 
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
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

export function getGraphUserActivity(userId: string): Promise<GraphicData[]>{
  return new Promise(resolve => { 
    api.get('Schedules/GetGraphUserActitivy?userId=' + userId)
    .then((response) => {   
      const data = response.data as GraphicData[]
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response)
      console.error("Ops! ocorreu um erro" + err)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
    })
  })
}

export function checkIfNeedsToAcceptRule(activityId: string, userId: string) {
  return new Promise(resolve => {
  api.get(`/Activitys/CheckIfNeedsToAcceptRule?activityId=${activityId}&userId=${userId}`)
    .then((response) => {
      const data = response.data
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response)
      console.error("Ops! ocorreu um erro" + err)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
    })
  })
}

export function acceptedOperationRule(userId: string, activityId: string) {
  return new Promise(resolve => {
    api.post(`/Activitys/AcceptedOperatingRule?ActivityId=${activityId}&UserId=${userId}`)
    .then((response) => {
      const data = response.data
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response)
      console.error("Ops! ocorreu um erro" + err)
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`))
    })
  })
}
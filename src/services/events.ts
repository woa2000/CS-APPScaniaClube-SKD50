import api from '../services/api'
import {
  Event, FormProps, ModelResult, PaymentModelResult
} from '../interfaces/interfaces'
import { Alert } from 'react-native';
import { t } from 'i18next';

export function getActiveEvents() : Promise<Event[]> {
  return new Promise(resolve => {
    api.get('Events/GetActiveEvents')
    .then(async (response) => {
      const data = response.data as Event[];

      const eventsWithDetails = await Promise.all(
        data.map(async (event) => {
          try {
            const detailResponse = await api.get('Events/GetEvent/' + event.id)
            const detailData = detailResponse.data as Event

            return {
              ...event,
              ...detailData,
            }
          } catch (detailErr) {
            console.log('event detail error ->', detailErr)
            return event
          }
        })
      )

      resolve(eventsWithDetails)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}

export function getEvent(id: string) : Promise<Event> {
  return new Promise(resolve => {
    api.get('Events/GetEvent/' + id)
    .then((response) => {
      const data = response.data as Event;

      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}

export function getLastEvents() : Promise<Event[]> {
  return new Promise(resolve => {
    api.get('Events/GetLastEvents')
    .then((response) => {
      const data = response.data as Event[];
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}

export function getEventsByUserId(userId: string) : Promise<Event[]> {
  return new Promise(resolve => {
    api.get('Events/byUserId/' + userId)
    .then((response) => {
      const data = response.data as Event[];
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}

export function createReservation(formData: FormProps) : Promise<PaymentModelResult> {
  return new Promise(resolve => {
    api.post('Events/CreateReservation', formData)
    .then((response) => {
      const data = response.data as PaymentModelResult;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}
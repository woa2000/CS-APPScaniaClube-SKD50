import api from "./api";
import { 
  ExerciseDetailProps,
  ExerciseProps, 
  SheetTrainingProps 
} from "../interfaces/interfaces";
import { Alert } from "react-native";
import { t } from "i18next";

export function getListSheetClass(userId: string) : Promise<SheetTrainingProps[]> {
  return new Promise(resolve => {
    api.get("ClassSheetAPI/GetListSheetClass?userId=" + userId)
    .then((response) => {
      const data = response.data as SheetTrainingProps[];
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    });
  })
}

export function getSheetClass(id: string) : Promise<ExerciseProps> {
  return new Promise(resolve => {
    api.get('ClassSheetAPI/GetSheetClass?SheetClassId=' + id)
    .then((response) => {
      const data = response.data as ExerciseProps;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    })
  })
}

export function getSheetClassByScheduling(id: string) {
  return new Promise(resolve => {
    api.get('ClassSheetAPI/GetSheetClassByScheduling?ScheduleId=' + id)
    .then((response) => {
      const data = response.data;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    })
  })
}

export function getExercise(id: string) : Promise<ExerciseDetailProps> {
  return new Promise(resolve => {
    api.get('ClassSheetAPI/GetExercise?ExerciseId=' + id)
    .then((response) => {
      const data = response.data as ExerciseDetailProps;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    })
  })
}

export function getSheetClassBySchedulingAndUser(id: string, userId: string) {
  return new Promise(resolve => {
    console.log('dados -> ', id, 'userid ->', userId);
    api.get('ClassSheetAPI/GetSheetClassBySchedulingAndUser?ScheduleId=' + id + '&userId=' + userId)
    .then((response) => {
      console.log('treino ->', response.data);
      const data = response.data;
      resolve(data)
    })
    .catch((err) => {
      console.log(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    })
  })
}

export function updatedClassSheet(scheduleId: string, classSheetId: string) {
  return new Promise(resolve => {
    api.post('ClassSheetAPI?scheduledId=' + scheduleId + '&classSheetId=' + classSheetId)
    .then((response) => {
      const data = response.data;
      resolve(data)
    })
    .catch((err) => {
      console.error(err.response);
      console.error("Ops! ocorreu um erro" + err);
      Alert.alert('', t(`${err.response?.data?.modelResult?.message[0].message as string}`));
    })
  })
}
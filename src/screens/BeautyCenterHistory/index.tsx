import React, { useState, useEffect } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { AlertCustom } from '../../components/AlertCustom'
import { BannerActivity } from '../../components/BannerActivity'
import { ItemList } from '../../components/ItemList'
import { useAuth } from '../../contexts/auth'
import { BeautyCenterSchedule, SpaceSchedule } from '../../interfaces/interfaces'
import * as beautyCenterService from '../../services/beautyCenter'
import { 
  Container,
  ContentTable,
  NavigationButtons,
  TitleButton,
  Items,
  styles,  
} from './styles'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function BeautyCenterHistory() {
  const { user } = useAuth()
  const [visible, setVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [itemCancel, setItemCancel] = useState('')
  const [alertMessage, setAlertMessage] = useState('') 
  const [optionSelected, setOptionSelected] = useState(true)
  const [scheduleBeautyCenter, setScheduleBeautyCenter] = useState<BeautyCenterSchedule[]>([])
  const [historicBeautyCenter, setHistoricBeautyCenter] = useState<BeautyCenterSchedule[]>([])

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function handleLikeActivity() {
    return false
  }

  async function getBeautyCenterSchedule() {
    const response = await beautyCenterService.getScheduledUserAestheticCenter(user?.id as string)
    setScheduleBeautyCenter(response as SpaceSchedule[])
  }

  async function getBeautyCenterHistory() {
    const response = await beautyCenterService.getRecordUserAestheticCenter(user?.id as string)
    setHistoricBeautyCenter(response as SpaceSchedule[])
  }

  async function handleCancel(id: string) {
    try{
      await beautyCenterService.cancelBookingBeautyCenterReserve(id).then((response) => {
        if(response.success){
          getBeautyCenterSchedule()
          return true
        }
        else {
          Alert.alert('', response.modelResult?.message[0].message as string)
        }
      })
    } catch(error){
      console.log(error)
    }
    return false
  }

  function alert(){
    setVisible(true)
    setAlertTitle(t('Cancelar'))
    setAlertMessage(t('Deseja realmente cancelar esta reserva?'))
    return true    
  }

  useEffect(() => {
    getBeautyCenterSchedule()
    getBeautyCenterHistory()
  }, [])

  return (
    <Container>
      <BannerActivity 
        title={t("Centro Estético")}
        urlImage="https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg"
        defaultIcon={"cut"}
        customIconSize={35}
        showFavorite={false}
        handleLikeActivity={() => handleLikeActivity()}
      />
      <ContentTable>
        <NavigationButtons>
        <TouchableOpacity 
            onPress={() => setOptionSelected(true)}
            style={optionSelected ? styles.buttonActive : styles.buttonInactive}
          >
            <TitleButton>
            {t("Agendadas")}
            </TitleButton>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setOptionSelected(false)}
            style={optionSelected ? styles.buttonInactive : styles.buttonActive}
          >
            <TitleButton>
            {t("Histórico")}
            </TitleButton>
          </TouchableOpacity>
        </NavigationButtons>

        {
          optionSelected ? (
            <Items>
              <FlatList
                data={scheduleBeautyCenter}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={25}
                removeClippedSubviews={true}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <ItemList
                    key={item.id}
                    title={td(item.activityTitle, item.activityTitle_EN)}
                    date={item.scheduleLabel}
                    showButtonCancel={true}
                    onPress={() => {
                      alert()
                      setItemCancel(item.id)
                    }}
                  />
                )}
              />
            </Items>
          ) : (
            <Items>
              <FlatList
                data={historicBeautyCenter}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={25}
                removeClippedSubviews={true}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <ItemList
                    key={item.id}
                    title={td(item.activityTitle, item.activityTitle_EN)}
                    date={item.scheduleLabel}
                    showButtonActivity={true}
                    onPress={() => {}}
                  />
                )}
              />
            </Items>
          )
        }
      </ContentTable>
      
      <AlertCustom 
        visible={visible}
        title={alertTitle}
        showButtonCancel={true}
        message={alertMessage}
        onConfirm={() => {
          handleCancel(itemCancel)
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
          return
        }}
      />  
    </Container>
  )
}
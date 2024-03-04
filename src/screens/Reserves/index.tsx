import React, { useState, useEffect } from 'react'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { AlertCustom } from '../../components/AlertCustom'
import { BannerActivity } from '../../components/BannerActivity'
import { ItemList } from '../../components/ItemList'
import { useAuth } from '../../contexts/auth'
import { SpaceSchedule } from '../../interfaces/interfaces'
import * as spaceService from '../../services/space'
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


export function Reserves() {
  const { user } = useAuth()
  const [visible, setVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [itemCancel, setItemCancel] = useState('')
  const [alertMessage, setAlertMessage] = useState('') 
  const [optionSelected, setOptionSelected] = useState(true)
  const [scheduleSpace, setScheduleSpaces] = useState<SpaceSchedule[]>([])
  const [historicSpace, setHistoricSpaces] = useState<SpaceSchedule[]>([])

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function handleLikeActivity() {
    return false
  }

  async function getSpacesSchedule() {
    const response = await spaceService.getScheduledUserSpace(user?.id as string)
    setScheduleSpaces(response as SpaceSchedule[])
  }

  async function getSpacesHistory() {
    const response = await spaceService.getRecordUserSchedulesSpace(user?.id as string)
    setHistoricSpaces(response as SpaceSchedule[])
  }

  async function handleCancel(id: string) {
    try{
      await spaceService.cancelBookingSpace(id).then((response) => {
        if(response.success){
          getSpacesSchedule()
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
    setAlertMessage(t('Realmente deseja cancelar esta reserva?'))
    return true    
  }

  useEffect(() => {
    getSpacesSchedule()
    getSpacesHistory()
  }, [])

  return (
    <Container>
      <BannerActivity 
        title={t("Espaços")}
        urlImage="https://images.pexels.com/photos/6642497/pexels-photo-6642497.jpeg"
        defaultIcon={"tree"}
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
                data={scheduleSpace.sort(
                  (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate()
                )}
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
                data={historicSpace}
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
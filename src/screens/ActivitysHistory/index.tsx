import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, Alert, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { VictoryPie } from 'victory-native'

import { 
  ActivitySchedule, 
  GraphicData, 
  GraphicProps, 
  UserGroupActivity 
} from '../../interfaces/interfaces'

import * as activityService from '../../services/activity'
import { AlertCustom } from '../../components/AlertCustom'
import { ItemList } from '../../components/ItemList'
import { theme } from '../../global/styles/theme'
import { useAuth } from '../../contexts/auth'
import { styles } from './styles'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


const graphicColor = [ 
  '#8A56AC', 
  '#4F8DCB', 
  '#9599B3', 
  '#fa0979', 
  '#5fd619', 
  '#4219d6'
]

export function ActivitysHistory() {
  const { user } = useAuth()
  const navigation = useNavigation()  
  const [graphicOption, setGraphicOption] = useState('Week')
  const [graphicData, setGraphicData] = useState<GraphicData[]>([] as GraphicData[])
  const [graphicDataWeek, setGraphicDataWeek] = useState([] as GraphicProps[])
  const [graphicDataMonth, setGraphicDataMonth] = useState([] as GraphicProps[])
  const [graphicDataYear, setGraphicDataYear] = useState([] as GraphicProps[])
  const [scheduleActivitys, setScheduleActivitys] = useState<ActivitySchedule[]>([])  
  const [historicActivitys, setHistoricActivitys] = useState<ActivitySchedule[]>([]) 
  const [refreshing, setRefreshing] = useState(true)
  const [optionSelected, setOptionSelected] = useState(true)
  const [itemCancel, setItemCancel] = useState('')
  const [visible, setVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('') 

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function getActivitysSchedule() {
    const response = await activityService.getScheduledUserActvities(user?.id as string)
    setScheduleActivitys(response as ActivitySchedule[])
  }

  async function getActivitysHistory() {
    const response = await activityService.getRecordUserSchedules(user?.id as string)
    setHistoricActivitys(response as ActivitySchedule[])
  }
  
  async function handleRefreshing(){
    setRefreshing(true)
    await getActivitysSchedule()
    await getActivitysHistory()
    setRefreshing(false)
  }

  async function getGraphicData() {
    const response = await activityService.getGraphUserActivity(user?.id as string)
    setGraphicData(response as GraphicData[])
  }

  async function getGraphicDataWeek() {
    
    const data = graphicData[0].userGroupActivity as UserGroupActivity[]
    
    const dataWeek = data.map(item => {
      return {
        x: item.activityName,
        y: item.duration
      }
    })

    await setGraphicDataWeek(dataWeek)

    return setGraphicOption('Week')
  }

  async function getGraphicDataMonth() {
    const data = graphicData[1].userGroupActivity as UserGroupActivity[]
    
    const dataMonth = data.map(item => {
      return {
        x: item.activityName,
        y: item.duration
      }
    })

    await setGraphicDataMonth(dataMonth)

    return setGraphicOption('Month')
  }

  async function getGraphicDataYear() {
    const data = graphicData[2].userGroupActivity as UserGroupActivity[]
    
    const dataYear = data.map(item => {
      return {
        x: item.activityName,
        y: item.duration
      }
    })

    await setGraphicDataYear(dataYear)

    return setGraphicOption('Year')
  }

  function alert(){
    setVisible(true)
    setAlertTitle(t('Cancelar'))
    setAlertMessage(t('Deseja realmente cancelar a atividade?'))
    return true    
  }

  async function handleCancel(id: string) {
    try{
      await activityService.cancelBookingActivity(id).then((response) => {
        if(response.success){
          getActivitysSchedule()
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

  useEffect(() => {
    handleRefreshing()
    getGraphicData()
    getActivitysSchedule()
    getActivitysHistory()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentButtons}>
          <TouchableOpacity 
            style={graphicOption === 'Week' ? styles.buttonActive : styles.buttonInactive} 
            onPress={getGraphicDataWeek}
          >
            <Text style={graphicOption === 'Week' ? styles.textButtonActive : styles.textButtonInactive}>
              {t("Semana")}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={graphicOption === 'Month' ? styles.buttonActive : styles.buttonInactive} 
            onPress={getGraphicDataMonth}
          >
            <Text style={graphicOption === 'Month' ? styles.textButtonActive : styles.textButtonInactive}>
            {t("Mês")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={graphicOption === 'Year' ? styles.buttonActive : styles.buttonInactive} 
            onPress={getGraphicDataYear}
          >
            <Text style={graphicOption === 'Year' ? styles.textButtonActive : styles.textButtonInactive}>
            {t("Ano")}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.contentGraphic}
          onPress={() => navigation.navigate('ActivityHistoryDetail')}
        >
        {
          graphicOption === 'Week' && (
            <>
              <VictoryPie
                data={graphicDataWeek}
                colorScale={graphicColor}
                style={{ 
                  labels: { 
                    fill: '#8A56AC', 
                    fontSize: 12, 
                  } 
                }}
                height={280}
                width={280}
                padAngle={1}
                innerRadius={75}
                animate={{ easing: 'exp'}}
              />
              <View style={styles.contentGraphicText}>
                <Text style={styles.text}>{graphicDataWeek.length}</Text>
                <Text style={styles.total}>{t("Total Atividades")}</Text>
              </View>
            </>
          ) 
        }

        {
          graphicOption === 'Month' && (
            <>
              <VictoryPie
                data={graphicDataMonth}
                colorScale={graphicColor}
                style={{ 
                  labels: { 
                    fill: '#8A56AC', 
                    fontSize: 12, 
                  } 
                }}
                height={280}
                width={280}
                padAngle={1}
                innerRadius={75}
                animate={{ easing: 'exp'}}
              />
              <View style={styles.contentGraphicText}>
                <Text style={styles.text}>{graphicDataMonth.length}</Text>
                <Text style={styles.total}>{t("Total Atividades")}</Text>
              </View>
            </>
          ) 
        }

        {
          graphicOption === 'Year' && (
            <>
              <VictoryPie
                data={graphicDataYear}
                colorScale={graphicColor}
                style={{ 
                  labels: { 
                    fill: '#8A56AC', 
                    fontSize: 12, 
                  } 
                }}
                height={280}
                width={280}
                padAngle={1}
                innerRadius={75}
                animate={{ easing: 'exp'}}
              />
              <View style={styles.contentGraphicText}>
                <Text style={styles.text}>{graphicDataYear.length}</Text>
                <Text style={styles.total}>{t("Total Atividades")}</Text>
              </View>
            </>
          ) 
        }
          
        </TouchableOpacity>
      </View>

      <View style={styles.contentHistory}>
        <View style={styles.buttons}>
          <TouchableOpacity 
            onPress={() => {
              handleRefreshing()
              setOptionSelected(true)
            }}
            style={optionSelected ? styles.optionActive : styles.optionInactive}
          >
            <Text style={styles.title}>
            {t("Agendadas")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => 
              {
                handleRefreshing()
                setOptionSelected(false)
              }}
            style={optionSelected ? styles.optionInactive : styles.optionActive}
          >
            <Text style={styles.title}>
            {t("Histórico")}
            </Text>
          </TouchableOpacity>
        </View>
      
        {
          optionSelected ? (
            <View style={styles.items}>
              <FlatList
                data={scheduleActivitys.sort(
                  (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
                )}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={25}
                removeClippedSubviews={true}
                refreshing={refreshing}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <ItemList
                    key={item.id}
                    title={item.activityTitle}
                    date={item.scheduleLabel}
                    showButtonActivity={true}
                    showButtonCancel={true}
                    onPressActivity={() => navigation.navigate('ActivityDetail', {
                      id: item.id,
                      title: item.activityTitle,
                      date: item.scheduleLabel,
                    })}
                    onPressCancel={() => {
                      alert()
                      setItemCancel(item.id)
                    }}
                  />
                )}
              />
            </View>
            ) : (
            <View style={styles.items}>
              <FlatList
                data={historicActivitys.sort(
                  (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate()
                )}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={25}
                removeClippedSubviews={true}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <ItemList
                    key={item.id}
                    title={item.activityTitle}
                    date={item.scheduleLabel}
                    showButtonActivity={true}
                    onPressActivity={() => navigation.navigate('TrainingHistory', {
                      id: item.id,
                      title: item.activityTitle,
                      date: item.scheduleLabel,
                    })}
                  />
                )}
              />
            </View>
          )
        }
      </View>
      
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
      
    </View>
  )
}
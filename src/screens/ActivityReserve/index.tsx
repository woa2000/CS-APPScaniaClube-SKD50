import React, { useState, useEffect } from 'react'
//import SkeletonContent from 'react-native-skeleton-content'
import CalendarStrip from 'react-native-calendar-strip'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


import { 
  ScrollView, 
  Alert,
  Dimensions,
  Modal
} from 'react-native'

import { BannerActivity } from '../../components/BannerActivity'
import * as activityService from '../../services/activity'
import { HourList } from '../../components/HourList'
import { useAuth } from '../../contexts/auth'

import 'moment';
import 'moment/locale/pt-br';
import moment from 'moment-timezone';

import { 
  Availability, 
  Calendar, 
  Container, 
  Hours, 
  TextAvailability 
} from './styles'


import { 
  Activity, 
  NavigationParams, 
  ScheduleDates, 
  ScheduleActivity 
} from '../../interfaces/interfaces'

import { AlertCustom } from '../../components/AlertCustom'
import { theme } from '../../global/styles/theme'
import { Feather } from '@expo/vector-icons'

export function ActivityReserve() {
  const route = useRoute()
  const navigation = useNavigation()
  const currentDate = moment().format('YYYY-MM-DD')
  const [schedulesActivity, setSchedulesActivity] = useState<ScheduleActivity[]>({} as ScheduleActivity[])
  const [scheduleDate, setScheduleDate] = useState<ScheduleDates>({} as ScheduleDates)
  const [activity, setActivity] = useState<Activity>({} as Activity)
  const [selected, setSelected] = useState(currentDate)
  const {fileServer, setTitleHeader, user} = useAuth()
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };

  
  async function changeSelectedDay(day: moment.Moment) {
    let date = new Date(day.year(), day.month(), day.date())
    
    let yyyy = date.getUTCFullYear()
    let mm = `0${date.getUTCMonth() + 1}`.slice(-2)
    let dd = `0${date.getUTCDate()}`.slice(-2)
      
    setSelected(`${yyyy}-${mm}-${dd}`)  
    
    await loadScheduleActivity(activity.id, `${yyyy}-${mm}-${dd}`)
    .then((resolve) => {
      setSchedulesActivity(resolve as ScheduleActivity[])
    })   
  }

  async function loadActivity(id: string) {
    try{
      const response = await activityService.getActivity(id, user?.id as string)
      setActivity(response as Activity);
      const dataActivity = await activityService.getDateActivity(id) 
      setScheduleDate(dataActivity as ScheduleDates);
    }catch(error){
      console.log(error)
    }
  }

  async function loadScheduleActivity(id: string, date: string) {
    try{
      const response = await activityService.getScheduleActivity(id, date)
      return response
    } catch(error){
      console.log(error)
    }
  }

  async function handleCheckTerms(activityId: string, hoursId: string) {
    await activityService.checkIfNeedsToAcceptRule(activityId, user?.id as string)
      .then((response) => {
        console.log('handleCheckTerms ->',response)
        if(response === true) {
          handleOpenAgreeTerms(user?.id as string, activityId)
        }else{
          handleBooking(hoursId)
        }
      })
  }

  async function handleOpenAgreeTerms(userId: string, activityId: string) {
    navigation.navigate('AgreeTermsReserves', { userId, activityId })
  }

  async function handleBooking(id: string) {
    try{
      await activityService.bookingActivity(id).then((response) => {
        if(response.success){
          loadScheduleActivity(activity.id, selected).then((resolve) => {
            setSchedulesActivity(resolve as ScheduleActivity[])
          })
          return true
        }
        else{
          Alert.alert('', response.modelResult?.message[0].message as string)
        }
      })
    }catch(error){
      console.log(error)
    }
    return false
  }

  async function handleCancel(id: string) {
    try{
      await activityService.cancelBookingActivity(id).then((response) => {
        if(response.success){
          setVisible(true)
          setAlertTitle(t('Sucesso'))
          setAlertMessage(t('Cancelamento realizado com sucesso!'))
          loadScheduleActivity(activity.id, selected).then((resolve) => {
            setSchedulesActivity(resolve as ScheduleActivity[])
          })
          return true
        }

        else{
          Alert.alert('', response.modelResult?.message[0].message as string)
        }
      })
    } catch(error){
      console.log(error)
    }
    return false
  } 

  async function handleLikeActivity(activityId: string, isLiked: boolean) {
    try{
      await activityService.likeActivity(activityId, user?.id as string, isLiked).then((response) => {
        if(response.success){
          return true
        }
      })
    } catch(error){
      console.log(error)
    }

    return false
  }
  
  useEffect(() => {
    const params = route.params as NavigationParams
    setTitleHeader(params.title as string)
    loadActivity(params.id as string)
    .then(() => {   
      loadScheduleActivity(params.id as string, selected).then((resolve) => {
        setSchedulesActivity(resolve as ScheduleActivity[])
        setLoading(false)  
      })
    })
  }, [])
  
  return (
    <Container>
      {/* <SkeletonContent
        containerStyle={{ flex: 1, width: '100%', height: '100%' }}
        animationDirection="horizontalRight"
        isLoading={loading}
        layout={[
          { 
            key: 'banner', 
            width: Dimensions.get('window').width, 
            height: 297, 
            marginBottom: 10 
          },
          {
            key: 'searchBar',
            width: '100%',
            height: 80,
            marginBottom: 20,
          },
          { 
            key: 'card', 
            width: '90%', 
            height: 80, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 10 
          },
          { 
            key: 'card2', 
            width: '90%', 
            height: 80, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 10 
          },
          { 
            key: 'card3', 
            width: '90%', 
            height: 80, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 10 
          }
        ]}
      > */}
        <ScrollView>
          <BannerActivity 
            icon={activity.icon}
            urlImage={fileServer + activity.image}
            title={td(activity.description, activity.description_EN)}
            isLiked={activity.isLiked}
            handleLikeActivity={() => handleLikeActivity(activity.id as string, activity.isLiked)}
          />

          <Calendar>
            <CalendarStrip
              scrollable
              scrollerPaging
              selectedDate={moment(selected)}
              startingDate={moment()}
              minDate={new Date()}
              maxDate={moment().add(15, 'days')}
              style={{ height: 80, paddingVertical: 6}}
              showMonth={false}
              dateNumberStyle={{ color: '#000' }}
              dateNameStyle={{ color: '#000' }}
              highlightDateNumberStyle={{ color: '#fff' }}
              highlightDateNameStyle={{ color: '#fff' }}
              disabledDateNameStyle={{ color: 'grey' }}
              disabledDateNumberStyle={{ color: 'grey' }}
              iconContainer={{flex: 0.1}}
              locale={{name: 'pt-br', config: moment().locale('pt-br')}}
              highlightDateContainerStyle={{
                backgroundColor: theme.colors.primaryBlue,
                width: 35,
                height: 35,
              }}
              onDateSelected={(date) => {
                changeSelectedDay(date)
              }}
            />
          </Calendar>

          <Hours>
            { 
              schedulesActivity.length > 0 ?
              schedulesActivity.map(schedule => (
                <HourList
                  key={schedule.id}
                  id={schedule.id}
                  date={schedule.dateLabel}
                  hour={schedule.scheduleLabel}
                  vacancies={schedule.vacanciesLabel}
                  isScheduled={schedule.isScheduled}
                  buttonLoading={loading}
                  handleBooking={() => handleCheckTerms(activity.id as string, schedule.id as string)}
                  handleCancel={() => handleCancel(schedule.sheduledId as string)}
                />
              ))
              :
              (
                <Availability>
                  <Feather name='alert-triangle' size={90} color={'#c3c3c3'} />
                  <TextAvailability>
                    {t("Não existem eventos ou horários disponíveis para essa data.")}
                  </TextAvailability>
                </Availability>
              )
            } 
          </Hours>
        </ScrollView>
      {/* </SkeletonContent> */}

      <AlertCustom 
        visible={visible}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => {
          setVisible(false)
          return true
        }}
        onCancel={() => {
          setVisible(false)
          return
        }}
      />

    </Container>
  )
}
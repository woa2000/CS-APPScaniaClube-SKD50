import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// import SkeletonContent from 'react-native-skeleton-content'
import CalendarStrip from 'react-native-calendar-strip'
import { Alert, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { 
  Availability, 
  Calendar, 
  Container, 
  Content, 
  ContentProfessional,
  ContentInfo,
  TextInfo,
  Hours, 
  TextAvailability 
} from './styles'

import { AvatarProfessional } from '../../components/AvatarProfessional'
import * as beautyCenterService from '../../services/beautyCenter'
import { BannerActivity } from '../../components/BannerActivity'
import { AlertCustom } from '../../components/AlertCustom'
import { HourList } from '../../components/HourList'
import { theme } from '../../global/styles/theme'
import { useAuth } from '../../contexts/auth'

import 'moment';
import 'moment/locale/pt-br';
import moment from 'moment-timezone';

import { 
  Activity, 
  NavigationParams, 
  Professional, 
  ScheduleActivity, 
} from '../../interfaces/interfaces'


import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';



export function BeautyCenterReserve() {
  const route = useRoute()
  const currentDate = moment().format('YYYY-MM-DD')
  const [schedulesActivity, setSchedulesActivity] = useState<ScheduleActivity[]>({} as ScheduleActivity[])
  const [professional, setProfessional] = useState<Professional>({} as Professional)
  const [activity, setActivity] = useState<Activity>({} as Activity)
  const [selected, setSelected] = useState(currentDate)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const {fileServer, user} = useAuth()
  
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
    
    await loadProfessionalSchedule(activity.id, `${yyyy}-${mm}-${dd}`, professional.id)
    .then((resolve) => {
      setSchedulesActivity(resolve as ScheduleActivity[])
    })   
  }

  async function loadActivity(id: string) {
    try{
      const response = await beautyCenterService.getBeautyCenterActivityWithLike(id, user?.id as string)
      setActivity(response as Activity);
    }
    catch(error){
      console.log(error)
    }
  }

  async function handleLikeActivity(activityId: string, isLiked: boolean) {
    try{
      await beautyCenterService.likeActivity(activityId, user?.id as string, isLiked)
      .then((response) => {
        if(response.success) {
          return true
        }
      })
    } catch(error){
      console.log(error)
    }
    return false
  }

  async function loadProfessionalSchedule(id: string, date: string, professionalId: string) {
    try{
      const response = await beautyCenterService
        .getSchedulesByProviders(id, date, professionalId)
      return response
    }
    catch(error){
      console.log(error)
    }
  }

  async function handleBooking(id: string) {
    try{
      await beautyCenterService.bookingActivity(id).then((response) => {
        if(response.success){
          loadProfessionalSchedule(activity.id, selected, professional.id)
          .then((resolve) => {
            setSchedulesActivity(resolve as ScheduleActivity[])
          })
          //return true
        }
        else{
          Alert.alert('', response.modelResult?.message[0].message as string)
        }
      })
    }catch(error){
      console.log(error)
    }
    //return false
  }

  async function handleCancel(id: string) {
    try{
      await beautyCenterService.cancelBookingActivity(id).then((response) => {
        if(response.success){
          setVisible(true)
          setAlertTitle(t('Sucesso'))
          setAlertMessage(t('Cancelamento realizado com sucesso!'))
          loadProfessionalSchedule(activity.id, selected, professional.id)
            .then((resolve) => {
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

  useEffect(() => {
    const params = route.params as NavigationParams 
    setProfessional(params.provider as Professional)
    loadActivity(params.id as string)
    .then(() => {   
      loadProfessionalSchedule(params.id as string, selected, params.provider?.id as string)
      .then((resolve) => {
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
        <Content>
          <BannerActivity 
            urlImage={fileServer + activity.image}
            icon={activity.icon}
            defaultIcon={"cut"}
            customIconSize={35}
            title={td(activity.description, activity.description_EN)}
            isLiked={activity.isLiked}
            handleLikeActivity={() => handleLikeActivity(
              activity.id as string, 
              activity.isLiked
            )}
          />
          <ContentProfessional>
            <AvatarProfessional
              activeOpacity={1}
              urlImage={fileServer + professional.imgPerfil}
            />
            <ContentInfo>
              <TextInfo>{professional.nome}</TextInfo>
            </ContentInfo>
          </ContentProfessional>
         
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
                  handleBooking={() => handleBooking(schedule.id as string)}
                  handleCancel={() => handleCancel(schedule.sheduledId as string)}
                />
              ))
              :
              (
                <Availability>
                  <Feather name='alert-triangle' size={90} color={'#c3c3c3'} />
                  <TextAvailability>
                    {t('Não existem horários disponíveis para essa data.')} 
                  </TextAvailability>
                </Availability>
              )
            } 
          </Hours>
        </Content>
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
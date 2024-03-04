import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// import SkeletonContent from 'react-native-skeleton-content'
import { Alert, Dimensions, View } from 'react-native'
import moment from 'moment';

import {
  Container,
  Information,
  Title,
  Description,
  Vacancys,
  Group,
  Line,
  Total
} from './styles'

import { ItemGroupReserve } from '../../components/ItemGroupReserve'
import { BannerPromotion } from '../../components/BannerPromotion'
import { ButtonStandard } from '../../components/ButtonStandard'

import {
  EventDetailProps,
  NavigationParams
} from '../../interfaces/interfaces'

import * as eventService from '../../services/events'
import { useAuth } from '../../contexts/auth'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';

interface EventTicketTypesProps {
  id: string
  quantity: number
  cost: number
  remainingVacancies: number
  description: string
  description_EN: string
}

export function EventDetail() {
  const route = useRoute()
  const { fileServer } = useAuth()
  const navigation = useNavigation()
  const params = route.params as NavigationParams
  const [loading, setLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0.00)
  const [totalFilledVacancies, setTotalFilledVacancies] = useState(0)
  const [eventTicketTypes, setEventTicketTypes] = useState<EventTicketTypesProps[]>([] as EventTicketTypesProps[])
  const [event, setEvent] = useState<EventDetailProps>({} as EventDetailProps)
  const [eventDate, setEventDate] = useState('')

  const { t, i18n } = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt: string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };

  function changeDate(date: string) {
    let dateEvent = new Date(date)

    let mm = `0${dateEvent.getUTCMonth() + 1}`.slice(-2)
    let dd = `0${dateEvent.getUTCDate()}`.slice(-2)

    let dateEventFormat = `${dd}/${mm}`

    setEventDate(dateEventFormat)
  }

  async function loadEvents(id: string) {
    try {
      const response = await eventService.getEvent(id)

      setEvent(() => { 
        var newState = response as EventDetailProps

        if (newState.eventsTicketTypes) {
          setEventTicketTypes([...newState.eventsTicketTypes.map(obj => ({
            id: obj.id,
            quantity: 0,
            cost: obj.cost,
            remainingVacancies: obj.remainingVacancies,
            description: obj.ticketType?.description,
            description_EN: obj.ticketType?.description_EN
          })) as EventTicketTypesProps[]])
        }

        return newState
      })

      changeDate(response.startEvent)
    }
    catch (error) {
      console.error('erro -> ', error)
    }
  }

  async function sumTotal() {
    if (event?.id !== undefined) {
      setTotalValue(
        eventTicketTypes?.reduce((previous, current) => previous + (current.quantity * current.cost), 0) ?? 0
      )
    }
  }

  async function handleReserveEvent() {
    if (totalFilledVacancies > 0) {
      navigation.navigate('EventReserve', {
        id: event.id,
        title: event.title,
        subtitle: event.subTitle,
        date: eventDate,
        forms: eventTicketTypes,
        hasRg: event.requestDocument,
        hasBirthDate: event.requestBirthDate,
        hasCellphone: event.requestCell,
        documentRequired: event.documentRequired,
        birthDateRequired: event.birthDateRequired,
        cellRequired: event.cellRequired
      })
    }
    else {
      Alert.alert(t('Por favor, selecione um tipo de ingresso'))
    }
  }

  useEffect(() => {
    loadEvents(params.id as string)
      .then(() => {
        setLoading(false)
        sumTotal()
      })
  }, [])

  useEffect(() => {
    sumTotal()
  }, [eventTicketTypes])

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
            marginBottom: 20
          },
          {
            key: 'titleAndButton',
            width: 180,
            height: 20,
            marginHorizontal: 20,
            marginBottom: 40
          },
          {
            key: 'text 1',
            width: '90%',
            height: 20,
            marginHorizontal: 20,
            marginBottom: 8
          },
          {
            key: 'text 2',
            width: '90%',
            height: 20,
            marginHorizontal: 20,
            marginBottom: 8
          },
          {
            key: 'text 3',
            width: '90%',
            height: 20,
            marginHorizontal: 20,
            marginBottom: 60
          },
          {
            key: 'button',
            width: '90%',
            height: 60,
            marginHorizontal: 20,
            marginBottom: 20,
            borderRadius: 40
          }
        ]}
      > */}
        <View key={event.id}>
          <BannerPromotion
            urlImage={fileServer + event.image}
            icon={event.icon}
            title={td(event.title, event.title_EN)}
            subtitle={td(event.subTitle, event.subTitle_EN)}
            date={eventDate}
            activeOpacity={1}
            showButtonBack={true}
          />

          <Information>
            <Title>
              {t("Informações")}
            </Title>
            <Description>
              {td(event.description, event.description_EN)}
            </Description>

            <Vacancys style={{ fontSize: 14 }}>
              {t("Vagas restantes")}
            </Vacancys>
            <Vacancys style={{ marginBottom: 15 }}>
              {totalFilledVacancies} / {event.totalRemainingVacancies}
            </Vacancys>

            {
              eventTicketTypes?.map((eventTicketType) => (
                <ItemGroupReserve
                  key={eventTicketType.id}
                  title={td(eventTicketType.description ?? '', eventTicketType.description_EN ?? '')}
                  price={eventTicketType.cost}
                  vacancy={eventTicketType.remainingVacancies}
                  value={eventTicketType.quantity}
                  onChangeValue={(value) => {
                    eventTicketType.quantity = value
                    setEventTicketTypes([...eventTicketTypes])
                    setTotalFilledVacancies(eventTicketTypes.reduce((previous, current) => previous + current.quantity, 0))
                  }}
                />
              ))
            }

            <Line />

            <Group>
              <Title>
                {t("Total")}
              </Title>
              <Total>
                {totalValue > 0 ? `R$ ${totalValue.toFixed(2)}` : t("GRATUITO")}
              </Total>
            </Group>

            <ButtonStandard
              title={t("Eu quero")}
              onPress={() => handleReserveEvent()}
            />
          </Information>
        </View>
      {/* </SkeletonContent> */}
    </Container>
  )
}
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { 
  Container,
  Header,
  ContainerIcon,
  Icon,
  Information,
  Title,
  Line,
  Subtitle,
  Date,
  Body,
  Forms,
  Form
} from './styles'

import { ButtonStandard } from '../../components/ButtonStandard'
import { EventReserveProps } from '../../interfaces/interfaces'
import { FormReserve } from '../../components/FormReserve'
import { useAuth } from '../../contexts/auth'
import { Alert, AlertButton } from 'react-native'

import * as eventService from '../../services/events'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';
import moment from 'moment'


interface FormProps {
  id?: string
  typeId: string
  title?: string
  name: string
  Rg?: string
  birthDateLabel?: string
  birthDate?: string | undefined
  cell: string
}

export function EventReserve() {
  const route = useRoute()
  const { user } = useAuth()
  const navigation = useNavigation()
  const params = route.params as EventReserveProps
  const [event, setEvent] = useState({} as EventReserveProps)
  const [forms, setForms] = useState<FormProps[]>([] as FormProps[])
  const [submitEnabled, setSubmitEnabled] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function handleSubmit() {
    setSubmitEnabled(false)
    setSubmitLoading(true)

    const formData = forms.map(form => {
      return {
        eventsTicketTypeId: form.typeId,
        eventID: event.id,
        name: form.name,
        document: form.Rg,
        birthDate: form.birthDateLabel ? moment(form.birthDateLabel, 'DD-MM-YYYY').format('YYYY-MM-DD') : undefined,
        cell: form.cell,
        requestingUserId: user?.id,
        paid: false
      }
    })
    
    try {
      const response = await eventService.createReservation(formData as any)
      
      if (response.result.payable) {
        navigation.navigate('Payment', { linkPayment: response.result.sandboxInitPoint })
      }
      else {
        Alert.alert('', t('Reserva concluída com sucesso!'), [
          { text: 'OK', onPress: () => navigation.navigate('Events') }
        ] as AlertButton[])
      }
    } catch (error) {
      Alert.alert(
        t('Erro'), 
        t('Ocorreu um erro ao realizar sua reserva, tente novamente mais tarde.')
      )
    }

    setSubmitEnabled(true)
    setSubmitLoading(false)
  }

  useEffect(() => {
    setEvent(params)
    
    let form = []

    for (let i = 0; i < params.forms.length; i++) {
      for(let g = 0; g < params.forms[i].quantity; g++) {
        form.push({
          id: params.forms[i].id + g,
          typeId: params.forms[i].id,
          title: td(params.forms[i].description, params.forms[i].description_EN) + ' ' + (g + 1),
          name: '',
          Rg: '',
          birthDateLabel: '',
          cell: '',
        })
      }
    }
    
    setForms(form)
   
  }, [])

  return (
    <Container>
      <Header>
        <ContainerIcon>
          <Icon name="sports-club" />
        </ContainerIcon>
        <Information>
          <Title>
            {td(event.title, event.title_EN)}
          </Title>

          <Line />

          <Subtitle>
            {td(event.subtitle, event.subtitle_EN)}
          </Subtitle>
          <Date>
            {event.date}
          </Date>
        </Information>
      </Header>


      <Body>
        <Forms>
          <Form>
          {
            forms.map(form => (
              <FormReserve
                key={form.id}
                title={form.title}
                name={form.name}
                RG={form.Rg}
                birthDate={form.birthDateLabel}
                phone={form.cell}
                type={0}
                shownRGField={event.hasRg}
                shownPhoneField={event.hasCellphone}
                shownBirthDateField={event.hasBirthDate}
                requiredRg={event.documentRequired}
                requiredBirthDate={event.birthDateRequired}
                requiredCellphone={event.cellRequired}

                onChangeName={(value) => {
                  form.name = value
                  setForms([...forms])
                }}
                onChangeRG={(value) => {
                  form.Rg = value
                  setForms([...forms])
                }}
                onChangeBirthDate={(value) => {
                  form.birthDateLabel = value
                  setForms([...forms])
                }}
                onChangePhone={(value) => {
                  form.cell = value
                  setForms([...forms])
                }}
              />
            ))
          }
          </Form>
        </Forms>

        <ButtonStandard 
          title={t("Reservar")}
          onPress={() => handleSubmit()}
          enabled={submitEnabled}
          loading={submitLoading}
        />
      </Body>
    </Container>
  )
}

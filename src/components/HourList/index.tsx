import React, {useState} from 'react'
import { View, Text, TouchableOpacity, TouchableOpacityProps, Button, Alert } from 'react-native'
import { styles } from './styles'
import { Ionicons } from '@expo/vector-icons';
import { ButtonBook } from '../../components/ButtonBook'
import { AlertCustom } from '../AlertCustom';

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


type Props = TouchableOpacityProps & {
  id?: string
  date?: string
  hour?: string
  vacancies?: string
  buttonLoading?: boolean | undefined    
  isScheduled?: boolean
  handleBooking: () => Promise<void>
  handleCancel: () => Promise<boolean>
}

export function HourList({ date, hour, vacancies, buttonLoading, isScheduled, ...rest }: Props) {
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };

  
  const messageCancel = t("Deseja realmente cancelar o seu agendamento?")

  async function handleSchedule() {
    setLoading(true)

    if(isScheduled) {
      setIsVisible(true)
      setLoading(true)
    }
    else{
      rest.handleBooking().then(() => setLoading(false))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentInfo}>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" style={styles.infoIco} />
            <Text style={styles.titleInfo}>{date}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="time-outline" style={styles.infoIco} />
            <Text style={styles.titleInfo}>{hour} | </Text>
            <Ionicons name="people-outline" style={styles.infoIco} />
            <Text style={styles.titleInfo}>{vacancies}</Text>
          </View>                    
        </View>

        <View style={styles.contentButton}>
          <ButtonBook
            title= {isScheduled ? t("Cancelar") : t("Agendar")}
            onPress={handleSchedule}
            loading={loading}
            isSchedule={isScheduled}
          />
        </View>
      </View>

      <AlertCustom
        visible={isVisible}
        title={t("Cancelar")}
        message={messageCancel}
        showButtonCancel={true}
        onConfirm={() => {
          setIsVisible(false)
          rest.handleCancel().then((result) => {
            setLoading(false)
          })
        }}
        onCancel={() => {
          setIsVisible(false)
          setLoading(false)}}
      />
    </View>
  )
}
   
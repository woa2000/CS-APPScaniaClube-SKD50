import React, {useState} from 'react'
import { View, Text, TouchableOpacityProps, Alert } from 'react-native'
import { styles } from './styles'
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { ButtonBook } from '../../components/ButtonBook'
import { AlertCustom } from '../AlertCustom';
import { MonitoringReserve } from '../MonitoringReserve';

import { useTranslation } from 'react-i18next';
import { ActivityResource, MonitoringChieldren } from '../../interfaces/interfaces';


type Props = TouchableOpacityProps & {
  id?: string
  date?: string
  hour?: string
  vacancies?: string
  usesResources?: boolean
  resources?: ActivityResource[]
  buttonLoading?: boolean | undefined    
  isScheduled?: boolean
  isMonitoring?: boolean
  handleUpdateChildren?: ({name, age}) => void
  handleBooking: (activityResourceId?: string) => Promise<void>
  handleBookingMentoring: () => Promise<void>
  handleCancel: () => Promise<boolean>
}

export function HourList({ date, hour, vacancies, usesResources, resources, buttonLoading, isScheduled, isMonitoring, handleUpdateChildren, ...rest }: Props) {
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMonitoringVisible, setIsMonitoringVisible] = useState(false)
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null)
  const [lstChildren, setLstChildren] = useState([] as MonitoringChieldren[]);
  

  const {t} = useTranslation();

  
  const messageCancel = t("Deseja realmente cancelar o seu agendamento?")
  const messageMonitoring = t("Informe o nome da criança e a idade e clique em adicionar.")
  const sortedResources = [...(resources ?? [])].sort((a, b) => a.order - b.order)
  const resourceOptions = sortedResources.map((resource) => ({
    label: resource.isTaken ? `${resource.name} (${t('reservado')})` : resource.name,
    value: resource.id,
    disabled: resource.isTaken,
  }))

  async function handleSchedule() {
    if(usesResources && !isScheduled && !selectedResourceId) {
      Alert.alert('', t('Escolha o espaço desejado'))
      return
    }

    setLoading(true)

    if(isScheduled) {
      setIsVisible(true)
      setLoading(true)
    }
    else{
      rest.handleBooking(selectedResourceId ?? undefined).then(() => setLoading(false))
    }
  }

  async function handleOpenMonitoring(){
    if(isScheduled) {
      setIsVisible(true)
      setLoading(true)
    }
    else{
      setIsMonitoringVisible(true);
    }   
  }

  async function handleMonitoringSchedule (childres: MonitoringChieldren[]) {
    setLoading(true)
    if(isScheduled) {
      setIsVisible(true)
      setLoading(true)
    }
    else{
      rest.handleBookingMentoring().then(() => setLoading(false))
    }
  }

  async function handleAddChildren (name: string, age: string){
    const newItem = { id: lstChildren.length + 1, name: name, age: age }
    setLstChildren([...lstChildren, newItem])
    handleUpdateChildren({name: name, age: age})
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.contentInfo}>
            <View style={styles.row}>
              <Ionicons name="calendar-outline" style={styles.infoIco} />
              <Text style={styles.titleInfo}>{date}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="time-outline" style={styles.infoIco} />
              <Text style={styles.titleInfo}>{hour}</Text>
            </View>
            {
              !usesResources ? (
                <View style={styles.row}>
                  <Ionicons name="people-outline" style={styles.infoIco} />
                  <Text style={styles.titleInfo}>{vacancies}</Text>
                </View>
              ) : null
            }
          </View>

          <View style={styles.contentButton}>
            <ButtonBook
              title= {isScheduled ? t("Cancelar") : t("Agendar")}
              onPress={isMonitoring ? handleOpenMonitoring : handleSchedule}
              loading={loading}
              isSchedule={isScheduled}
            />
          </View>
        </View>

        {
          usesResources ? (
            <View style={styles.dropdownWrapper}>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                itemTextStyle={styles.dropdownItemText}
                activeColor="#F3F7FB"
                data={resourceOptions}
                labelField="label"
                valueField="value"
                placeholder={t('Selecione')}
                value={selectedResourceId}
                onChange={(item) => {
                  if(item.disabled) {
                    return
                  }

                  setSelectedResourceId(item.value)
                }}
                renderItem={(item) => (
                  <View style={styles.dropdownItem}>
                    <Text style={item.disabled ? styles.dropdownItemDisabledText : styles.dropdownItemText}>
                      {item.label}
                    </Text>
                  </View>
                )}
              />
            </View>
          ) : null
        }
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

    <MonitoringReserve
        visible={isMonitoringVisible}
        title={t("MONITORIA INFANTIL")}
        message={messageMonitoring}
        showButtonCancel={true}
        lstChildren={lstChildren}
        onConfirm={() => {
          handleMonitoringSchedule(lstChildren)
          setIsMonitoringVisible(false)
          setLstChildren([])
        }}
        onCancel={() => {
          setIsMonitoringVisible(false)
          setLstChildren([])
        }}
        addChildren={({name, age}) => {
          handleAddChildren(name, age)
        }}
      />
    </View>
  )
}
   
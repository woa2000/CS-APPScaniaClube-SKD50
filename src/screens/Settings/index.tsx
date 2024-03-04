import React, { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts'
import * as Location from 'expo-location'
import { Switch } from 'react-native'

import { AlertCustom } from '../../components/AlertCustom'

import {
  Container, 
  SettingsContainer,
  Option,
  Label,
  Footer,
  FooterText,
  OptionButton
} from './styles'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../contexts/auth'


import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';

import * as userService from '../../services/user'


export function Settings() {
  const {user, singOut } = useAuth()
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [itemCancel, setItemCancel] = useState('')
  const [alertMessage, setAlertMessage] = useState('') 

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  const handleChangePassword = () => {
    navigation.navigate('ChangePassword')
  }

  const handleConfirm = () => {
    const id = user?.id as string;
    console.log('userId -> ',id);
    userService.removeProfile(id).then((response) => { 
      singOut();
    });
  }

  const handleRemoveAccount = () => {
    alert();
  }

  function alert(){
    setVisible(true)
    setAlertTitle(t('Excluir informações'))
    setAlertMessage(t('Realmente deseja excluir suas informações no aplicativo?'))
    return true    
  }
  
  return (
    <Container>
      <SettingsContainer>
        <OptionButton
          onPress={handleChangePassword}
        >
          <Label>
            {t("Trocar senha")}
          </Label>
          <Feather
            name="chevron-right"
            size={20}
            color="#999"
          />
        </OptionButton>
        <OptionButton
          onPress={handleRemoveAccount}
        >
          <Label>
            {t("Excluir informações")}
          </Label>
          <Feather
            name="chevron-right"
            size={20}
            color="#999"
          />
        </OptionButton>
      </SettingsContainer>
     
      <Footer>
        <FooterText>
          Version 1.1.8
        </FooterText>
      </Footer>

      <AlertCustom 
        visible={visible}
        title={alertTitle}
        showButtonCancel={true}
        message={alertMessage}
        onConfirm={() => {
          handleConfirm(itemCancel)
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
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/auth'
import * as userService from '../../services/user'

import {
  Container, 
  SettingsContainer,
  Option,
  Label,
  Footer,
  FooterText,
  OptionButton,
  LanguageSelector,
} from './styles'

import {useTranslation} from 'react-i18next';

const options = [
  { label: 'Inglês', value: 'en' },
  { label: 'Português', value: 'pt' },
]


export function Language() {
  const {user, updateLanguage} = useAuth();
   const {t, i18n} = useTranslation();
   
  function selectedLanguage(){
    console.log('selectedLanguage =>', i18n.language)
    if(i18n.language === 'en'){
      return 0
    }
    else{
      return 1
    }
  }

  async function handleChangeLanguage(value : string){
    updateLanguage(value);
    await userService.editLanguage(user?.id, value)
    console.log(value);
  }
  
  return (
    <Container>
      <SettingsContainer>
        <LanguageSelector 
          options={options}
          hasPadding
          initial={selectedLanguage()}
          onPress={(value : string) => {
            handleChangeLanguage(value)
          }}
        />
      </SettingsContainer>
     
      <Footer>
        <FooterText>
          Version 1.1.8
        </FooterText>
      </Footer>
    </Container>
  )
}
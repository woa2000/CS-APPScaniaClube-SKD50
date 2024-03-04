import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../contexts/auth'

import {useTranslation} from 'react-i18next';

import {
	Container,
  ContainerHeader,
  Name,
  Content,
  ButtonOption,
  TitleButton,
} from './styles'
import { Photo } from '../../components/Photo'

export function MenuProfile() {
  const { user, fileServer, singOut } = useAuth()
  const navigation = useNavigation()

   const {t, i18n} = useTranslation();
  return (
    <Container>
      <ContainerHeader>
        <Photo uri={fileServer as string + user?.imgPerfil} />
        <Name>{user?.nome}</Name>
      </ContainerHeader>

      <Content>
        <ButtonOption
          onPress={() => navigation.navigate('Profile')}
        >
          <TitleButton>{t("Meus dados")}</TitleButton>
          <Feather 
            name="chevron-right" 
            size={20} 
            color="#000" 
          />
        </ButtonOption>

        <ButtonOption
          onPress={() => navigation.navigate('Exams')}
        >
          <TitleButton>{t("Exames")}</TitleButton>
          <Feather 
            name="chevron-right" 
            size={20} 
            color="#000" 
          />
        </ButtonOption>

        <ButtonOption
          onPress={() => navigation.navigate('Language')}
        >
          <TitleButton>{t("Idioma")}</TitleButton>
          <Feather 
            name="chevron-right" 
            size={20} 
            color="#000" 
          />
        </ButtonOption>

        <ButtonOption
          onPress={() => navigation.navigate('Settings')}
        >
          <TitleButton>{t("Configurações")}</TitleButton>
          <Feather 
            name="chevron-right" 
            size={20} 
            color="#000" 
          />
        </ButtonOption>

        <ButtonOption
          onPress={singOut}
        >
          <TitleButton>{t("Sair")}</TitleButton>
          <Feather 
            name="chevron-right" 
            size={20} 
            color="#000" 
          />
        </ButtonOption>
      </Content>
    </Container>
	)
}

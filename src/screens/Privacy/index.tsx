import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from "expo-image-picker"
import { Feather } from '@expo/vector-icons'
import { useFormik } from 'formik'
import moment from 'moment'

import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking
} from 'react-native'

import { theme } from '../../global/styles/theme'
import { useAuth } from '../../contexts/auth'

import {
  Container,
  ContainerHeader,
  Content,
  Label,
  Title,
  SubTitle,
  Info,
  LI,
} from './styles'

import { ButtonStandard } from '../../components/ButtonStandard'
import { ButtonLogin } from '../../components/ButtonLogin'
import { AlertCustom } from '../../components/AlertCustom'
import { Input } from '../../components/Input'
import api from '../../services/api'

import * as userService from '../../services/user'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function Privacy() {
  const navigation = useNavigation()
  const { user, fileServer, singOut } = useAuth()

  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [image, setImage] = useState('')
  const [userImage, setUserImage] = useState({})

  const { t, i18n } = useTranslation()

  const openLink = () => {
    const url = 'http://scania-clube-homolog.azurewebsites.net/Privacy';

    Linking.openURL(url).catch(err => console.error('Erro ao abrir política de privacidade', err));
  };


  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1, backgroundColor: theme.colors.secundarySand
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <ContainerHeader>
              <Title>Política de Privacidade de Scania Clube</Title>
            </ContainerHeader>

            {/* <Content> */}
            <Info>Última atualização: [Data]</Info>
            <Info>Em Scania Clube, comprometemo-nos com a sua privacidade e a proteção dos seus dados pessoais. Esta política de privacidade tem como objetivo informá-lo de maneira clara e abrangente sobre como coletamos, usamos e compartilhamos suas informações pessoais, bem como esclarecer seus direitos em relação a esses dados.</Info>

            <SubTitle>1. Coleta de Dados</SubTitle>
            <Info>Scania Clube coleta/transmite/sincroniza/armazena [tipo de dados], como detalhado abaixo, para habilitar funcionalidades específicas que enriquecem sua experiência de usuário.</Info>
            <LI>•	Informações Pessoais: Incluindo, mas não limitado a, nome completo, número de registro, foto. Essas informações são coletadas para ativar o recurso de perfil do usuário, necessário para identificação do usuário.</LI>
            <LI>•	Dados de Uso: Coletamos dados sobre como você interage com nosso aplicativo, incluindo, mas não se limitando a, frequência de uso, áreas do aplicativo acessadas e ações realizadas dentro do aplicativo. Esses dados são coletados para melhorar experiência de uso, proporcionando melhor usabilidade e novos recursos para o aplicativo.</LI>

            <SubTitle>2. Uso de Dados</SubTitle>
            <Info>Utilizamos os dados coletados para:</Info>
            <LI>•	Fornecer, operar e manter nosso aplicativo.</LI>
            <LI>•	Melhorar, personalizar e expandir nosso aplicativo.</LI>
            <LI>•	Compreender e analisar como você utiliza nosso aplicativo.</LI>
            <LI>•	Desenvolver novos produtos, serviços, funcionalidades e funcionalidades.</LI>

            <SubTitle>3. Compartilhamento de Dados</SubTitle>
            <Info>Seu consentimento será obtido antes de compartilhar suas informações pessoais com terceiros, exceto nos seguintes casos:</Info>
            <LI>•	Requisitos Legais: Podemos divulgar suas informações onde seja legalmente exigido para cumprir com processos legais, como ordens judiciais ou mandados.</LI>

            <SubTitle>4. Segurança dos Dados</SubTitle>
            <Info>A segurança dos seus dados pessoais é de extrema importância para nós. Implementamos medidas de segurança técnicas e organizacionais projetadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet ou método de armazenamento eletrônico é 100% seguro. Enquanto nos esforçamos para usar meios comercialmente aceitáveis para proteger suas informações pessoais, não podemos garantir sua segurança absoluta.</Info>

            <SubTitle>5. Seus Direitos</SubTitle>
            <Info>Você tem o direito de acessar, corrigir, excluir ou limitar o uso de suas informações pessoais. Se desejar exercer algum desses direitos, por favor acesse Perfil > Configurações > Excluir Informações.</Info>

            <SubTitle>6. Alterações à Política de Privacidade</SubTitle>
            <Info>Reservamo-nos o direito de modificar esta política de privacidade a qualquer momento, portanto, revise-a frequentemente. Alterações e esclarecimentos entrarão em vigor imediatamente após sua publicação no aplicativo. Se fizermos alterações materiais a esta política, notificaremos você aqui que ela foi atualizada.
              Contato
Se você tiver quaisquer perguntas ou sugestões sobre nossa Política de Privacidade, não hesite em nos contatar em [inserir informações de contato]. */}
            </Info>           

            <ButtonLogin
              title={t("Concordo")}
              loading={loading}
              onPress={() => openLink()}
            />

            <ButtonStandard
              title={t("Sair")}
              onPress={singOut}
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}
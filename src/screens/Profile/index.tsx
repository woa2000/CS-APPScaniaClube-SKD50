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
} from 'react-native'

import { theme } from '../../global/styles/theme'
import { useAuth } from '../../contexts/auth'

import { 
  Container, 
  Content, 
  UserPhoto,
  TitleButton,
  Form, 
  Label,
  PickImageButton,
} from './styles'

import { ButtonStandard } from '../../components/ButtonStandard'
import { ButtonLogin } from '../../components/ButtonLogin'
import { AlertCustom } from '../../components/AlertCustom'
import { Input } from '../../components/Input'
import api from '../../services/api'

import * as userService from '../../services/user'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


interface ProfileFormData {
  id: string | undefined
  name: string | undefined
  email: string | undefined
  birthDate: string | undefined
  cpf: string | undefined
  phone?: string | undefined
  imgPerfil?: string | undefined
}

import { Photo } from '../../components/Photo'

export function Profile() {
  const navigation = useNavigation()
  const { user, setUserEdit, fileServer } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [image, setImage] = useState('')
  const [userImage, setUserImage] = useState({})
  const birthDay = moment(user?.dataNascimento).format('DD/MM/YYYY')

  const { t, i18n } = useTranslation()

  async function handleSelectImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      })
      
      if (!result.cancelled) {
        const filename = `${user?.id}.jpg`;
        var photo = {
          uri: result.uri,
          type: 'image/jpeg',
          name: filename,
        };

        try {
          const response = await userService.editProfileImage(user?.id as string, photo)
          setImage(result.uri)
        }
        catch (error) {
          Alert.alert(t('Erro ao atualizar foto de perfil'))
        }
      }
    }
    
  }
  
  const { handleChange, handleSubmit, setFieldValue, values } = useFormik<ProfileFormData>({
    initialValues: {
      id: user?.id,
      name: user?.nome,
      cpf: user?.cpf,
      email: user?.email,
      birthDate: user?.dataNascimento,
      phone: user?.celular,
    },	
    onSubmit: async (values) => {
      setLoading(true)
      const user = {
        id: values.id,
        nome: values.name,
        email: values.email,
        dataNascimento: values.birthDate,
        cpf: values.cpf,
        celular: values.phone,
      }
      
      try {
        await api.post('auth/EditProfile', user)
        setUserEdit(user)
        setIsVisible(true)
        setAlertTitle(t('Sucesso'))
        setAlertMessage(t('Perfil atualizado com sucesso!'))
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setIsVisible(true)
        setAlertTitle(t('Erro'))
        setAlertMessage(t('Não foi possivel editar seu perfil'))
      }      
    }
  })
  
  return (
    <>
      <KeyboardAvoidingView
				style={{ 
					flex: 1, backgroundColor: theme.colors.secundarySand }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled
			>
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <UserPhoto>
              <Photo uri={image} />

              <PickImageButton
                onPress={handleSelectImage}
              >
                <Feather name="camera" size={24} color="#fff" />
              </PickImageButton>
            </UserPhoto>
            
            <Content>
              <Form>
                <Label>{t("Nome")}</Label>
                <Input
                  editable={false}
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
                <Label>CPF</Label>
                <Input 
                  editable={false}
                  value={values.cpf}
                  onChangeText={handleChange('cpf')}
                />
                <Label>Email</Label>
                <Input 
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                <Label>{t("Data de Nascimento")}</Label>
                <Input 
                  editable={false}
                  value={birthDay}
                  onChangeText={(date) => {
                    setFieldValue('user?.birthDate', date)
                  }}
                />
                <Label>{t("Celular")}</Label>
                <Input 
                  maxLength={11}
                  keyboardType="numeric"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                />
              </Form>
            </Content>

            <ButtonLogin
              title={t("Salvar")}
              loading={loading}
              onPress={() => handleSubmit()}
            />

            <ButtonStandard
              title={t("Cancelar")}
              onPress={() => navigation.goBack()}
            />
          </Container>

          <AlertCustom 
            visible={isVisible}
            title={alertTitle}
            message={alertMessage}
            onConfirm={() => {
              setIsVisible(false)
              navigation.navigate('Perfil')
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  Container,
  BackgroundBlue,
  Card,
  Label,
  Form,
  ErrorMessage
} from './styles'

import { ButtonStandard } from '../../components/ButtonStandard'
import { AlertCustom } from '../../components/AlertCustom'
import { ButtonLogin } from '../../components/ButtonLogin'
import { theme } from '../../global/styles/theme'
import { Input } from '../../components/Input'
import api from '../../services/api'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


interface SignInFormData {
  email: string
}

export function ForgotPassword() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const { t, i18n } = useTranslation()

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required(t('O campo é obrigatório')),
  })

  const { handleChange, handleSubmit, errors, values } = useFormik<SignInFormData>({
    initialValues: {
      email: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
      }

      setLoading(true)
      
      await api.post('/auth/forgotpassword', data)
        .then(() => {
          setLoading(false)
          setIsVisible(true)
          setAlertTitle(t('Sucesso'))
          setAlertMessage(t('Verifique seu e-mail para recuperar sua senha'))
        })
        .catch(() => {
          setLoading(false)
          setIsVisible(true)
          setAlertTitle(t('Erro'))
          setAlertMessage(t('Usuário não encontrado'))
        })
    },
  })
  
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.secundaryFossil }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <StatusBar style="light" />
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
        <BackgroundBlue />
          <Container>
            <Card>
              <Form>
              <Label>E-mail</Label>
								<Input
									placeholder="email@email.com"
									keyboardType="email-address"
									value={values.email}
									onChangeText={handleChange('email')}
								/>
								{
									errors.email && 
										<ErrorMessage style={{ color: 'red' }}>
											{errors.email}
										</ErrorMessage>
								}
              </Form>
            </Card>
            <ButtonLogin
              title={t("Enviar")}
              loading={loading}
              onPress={() => handleSubmit()}
            />

            <ButtonStandard
							title={t("Voltar")}
							onPress={() => navigation.goBack()}
						/>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <AlertCustom 
        visible={isVisible}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => {
          setIsVisible(false)
        }}
      />
    </>  
  )
}


import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'

import {
  Container,
  BackgroundBlue,
  Card,
  Label,
  Form,
  ErrorMessage,
  RecoverPassword,
} from './styles'

import { ButtonStandard } from '../../components/ButtonStandard'
import { InputPassword } from '../../components/InputPassword'
import { AlertCustom } from '../../components/AlertCustom'
import { ButtonLogin } from '../../components/ButtonLogin'
import { theme } from '../../global/styles/theme'
import { Input } from '../../components/Input'
import { useAuth } from '../../contexts/auth'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


interface SignInFormData {
  username: string
  password: string
}

export function SignIn() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { singIn, hasError, errorMessage, setError } = useAuth()

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required(t('O campo é obrigatório')),
    password: Yup.string().required(t('O campo é obrigatório')),
  })

  const { handleChange, handleSubmit, errors, values } = useFormik<SignInFormData>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const { username, password } = values
      setLoading(true)
      await singIn(username, password)
    },
  })

  useEffect(() => {
    async function getErrors() {
      if (hasError) {
        setLoading(false)
        setIsVisible(true)
        setAlertMessage(errorMessage as string)
      }
    }

    getErrors().then(() => setError(false, null))
   
  }, [hasError, errorMessage])
  
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
                <Label>CPF</Label>
                <Input
                  placeholder="Somente números"
                  keyboardType="number-pad"
                  maxLength={11}
                  value={values.username}
                  onChangeText={handleChange('username')}
                />
                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
                <Label>{t("Senha")}</Label>
                <InputPassword
                  placeholder="********"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
              </Form>
            </Card>
            <ButtonLogin
              title={t("Entrar")}
              loading={loading}
              onPress={() => handleSubmit()}
            />
            <ButtonStandard
              title={t("Registrar")}
              onPress={() => navigation.navigate('SignUp')}
            />

            <RecoverPassword 
              onPress={() => navigation.navigate('Forgot')}
            >
              {t("Esqueceu sua senha?")}
            </RecoverPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <AlertCustom 
        visible={isVisible}
        title={t('Algo deu errado!')}
        message={alertMessage}
        onConfirm={() => {
          setIsVisible(false)
        }}
      />
    </>  
  )
}


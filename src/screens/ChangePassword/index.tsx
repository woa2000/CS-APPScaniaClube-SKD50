import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Platform } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ButtonStandard } from '../../components/ButtonStandard'
import { InputPassword } from '../../components/InputPassword'
import { AlertCustom } from '../../components/AlertCustom'
import { useAuth } from '../../contexts/auth'

import {
  Container, 
  ErrorMessage, 
  Form,
  Label
} from './styles'
import api from '../../services/api'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


interface ChangePasswordFormData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export function ChangePassword() {
  const { user } = useAuth()
  const navigation = useNavigation()
	const [loading, setLoading] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  const ValidationPassword = Yup.object().shape({
    oldPassword: Yup.string()
      .required(t('Senha obrigatória'))
      .min(6, t('Senha deve ter no mínimo 6 caracteres')),
    newPassword: Yup.string()
      .required(t('Senha obrigatória'))
      .min(6, t('Senha deve ter no mínimo 6 caracteres')),
    confirmPassword: Yup.string()
      .required(t('Senha obrigatória'))
      .min(6, t('Senha deve ter no mínimo 6 caracteres'))
      .oneOf([Yup.ref('newPassword')], t('As senhas não conferem')),
  })

  const { handleChange, handleSubmit, values, errors } = useFormik<ChangePasswordFormData>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: ValidationPassword,
    onSubmit: async (values) => {
      setLoading(true)
      const password = {
        userId: user?.id,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }

      try {
        await api.post('Auth/ChangePassword', password)
        setLoading(false)
        setIsVisible(true)
        setAlertTitle(t('Sucesso'))
        setAlertMessage(t('Sua senha foi alterada com sucesso!'))
        navigation.navigate('Settings')
      }
      catch (err) {
        setLoading(false)
        setAlertTitle(t('Erro'))
        setAlertMessage(t('Não foi possível alterar a senha'))
        setIsVisible(true)
      }
    }
  })

  return (
    <>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Form>
          <Label>
            {t("Senha anterior")}
          </Label>
          <InputPassword 
            value={values.oldPassword}
            onChangeText={handleChange('oldPassword')}
          />
          {
            errors.oldPassword && 
              <ErrorMessage>
                {errors.oldPassword}
              </ErrorMessage>
          }

          <Label>
          {t("Nova senha")}
          </Label>
          <InputPassword 
            value={values.newPassword}
            onChangeText={handleChange('newPassword')}
          />
          {
            errors.newPassword && 
              <ErrorMessage>
                {errors.newPassword}
              </ErrorMessage>
          }

          <Label>
          {t("Confirmar senha")}
          </Label>
          <InputPassword 
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
          />
          {
            errors.confirmPassword && 
              <ErrorMessage>
                {errors.confirmPassword}
              </ErrorMessage>
          }
        </Form>

        <ButtonStandard
          title={t("Alterar")}
          loading={loading}
          onPress={() => handleSubmit()}
        />
      </Container>
      
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
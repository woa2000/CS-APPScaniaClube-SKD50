import React, { useState } from 'react'
import { 
	KeyboardAvoidingView, 
	Platform,
	ScrollView,
	View,
	Alert,
	Text,
	Linking,
} from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../contexts/auth'
import { StatusBar } from 'expo-status-bar'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
	Container,
	BackgroundBlue,
	Card,
	Label,
	Form,
	Terms,
	ErrorMessage,
} from './styles'

import { ButtonStandard } from '../../components/ButtonStandard'
import { InputPassword } from '../../components/InputPassword'
import { AlertCustom } from '../../components/AlertCustom'
import { ButtonLogin } from '../../components/ButtonLogin'
import { InputDate } from '../../components/InputDate'
import { theme } from '../../global/styles/theme'
import { Input } from '../../components/Input'
import api from '../../services/api'

interface SignUpFormData {
	cpf: string
	birthDate: string
	email: string
	password: string
	confirmPassword: string
	checked: boolean
}

export function SignUp() {
	const [loading, setLoading] = useState(false)
	const navigation = useNavigation()
	const [isVisible, setIsVisible] = useState(false)
	const [alertTitle, setAlertTitle] = useState('')
  	const [alertMessage, setAlertMessage] = useState('')
	
	const { singIn } = useAuth()

	const termURL = 'https://scania-clube.azurewebsites.net/policy/declaracao_de_privacidade_APP.html';

	const RegisterSchema = Yup.object().shape({
		cpf: Yup.string()
			.required('CPF obrigatório')
			.min(11, 'CPF inválido')
			.max(11, 'CPF inválido'),
		birthDate: Yup.string()
			.required('Data de nascimento obrigatória'),
		email: Yup.string()
			.required('E-mail obrigatório')
			.email('Digite um e-mail válido'),
		password: Yup.string()
			.required('Senha obrigatória')
			.min(8, 'Senha deve ter no mínimo 8 caracteres'),
		confirmPassword: Yup.string()
			.required('Confirmação de senha obrigatória')
			.oneOf([Yup.ref('password'), null], 'Senhas não conferem'),
		checked: Yup.boolean()
			.oneOf([true], 'Você precisa aceitar os termos de uso')
			.required('Você deve aceitar os termos de uso')
	})

	const { handleChange, handleSubmit, values, errors } = useFormik<SignUpFormData>({
		initialValues: {
			cpf: '',
			birthDate: '',
			email: '',
			password: '',
			confirmPassword: '',
			checked: false
		},
		validationSchema: RegisterSchema,
		onSubmit: async (values) => {
			setLoading(true)
			const user = {
				cpf: values.cpf,
				birthdate: values.birthDate,
				email: values.email,
				password: values.password,
			}

			await api.post('auth/register', user)
				.then(() => {
					setIsVisible(true)
					setAlertTitle('Sucesso')
					setAlertMessage('Cadastro realizado com sucesso!')
					singIn(user.cpf, user.password)
					setLoading(false)
				})
				.catch(() => {
					setIsVisible(true)
					setAlertTitle('Erro')
					setAlertMessage(
						'Não foi possivel realizar seu cadastro, verifique seus dados e tente novamente'
					)
					setLoading(false)
				})
		}
	})

	return (
		<>
			<KeyboardAvoidingView
				style={{ 
					flex: 1, backgroundColor: theme.colors.secundaryFossil }}
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
									value={values.cpf}
									onChangeText={handleChange('cpf')}
								/>
								{
									errors.cpf && 
										<ErrorMessage>
											{errors.cpf}
										</ErrorMessage>
								}
								<Label>Data de Nascimento</Label>
								<InputDate
									type={'datetime'}
									options={{
										format: 'DD/MM/YYYY'
									}}
									
									placeholder="DD/MM/AAAA"
									keyboardType="number-pad"
									maxLength={10}
									value={values.birthDate}
									onChangeText={handleChange('birthDate')}
								/>
								{
									errors.birthDate && 
										<ErrorMessage style={{ color: 'red' }}>
											{errors.birthDate}
										</ErrorMessage>
								}
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
								<Label>Senha</Label>
								<InputPassword
									placeholder="*********"
									autoCorrect={false}
									secureTextEntry={true}
									value={values.password}
									onChangeText={handleChange('password')}
								/>
								{
									errors.password && 
										<ErrorMessage style={{ color: 'red' }}>
											{errors.password}
										</ErrorMessage>
								}
								<Label>Confirmar Senha</Label>
								<InputPassword
									placeholder="*********"
									autoCorrect={false}
									secureTextEntry={true}
									value={values.confirmPassword}
									onChangeText={handleChange('confirmPassword')}
								/>
								{
									errors.confirmPassword && 
										<ErrorMessage style={{ color: 'red' }}>
											{errors.confirmPassword}
										</ErrorMessage>
								}
								<View style={{ 
										flexDirection: 'row', 
										width: '90%'
									}}
								>
									<BouncyCheckbox
										size={20}
										fillColor={theme.colors.primaryBlue}
										unfillColor={theme.colors.typographySnow}
										iconStyle={{ color: theme.colors.typographySnow }}
										onPress={() => {
											values.checked = !values.checked
											handleChange('checked')
										}}
									/>
							
									<Terms>
										Eu li e aceito os <Text style={{ color: 'blue', textDecorationLine: 'underline' }} onPress={() => Linking.openURL(termURL)}>termos de uso e as políticas de privacidade.</Text>
									</Terms>
								</View>
								{
									errors.checked && 
										<ErrorMessage style={{ color: 'red' }}>
											{errors.checked}
										</ErrorMessage>
								}
							</Form>
						</Card>

						<ButtonLogin
							title="Registrar"
							loading={loading}
							onPress={() => handleSubmit()}
						/>
						<ButtonStandard
							title="Voltar"
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
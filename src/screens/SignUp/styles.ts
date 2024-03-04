import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Dimensions } from 'react-native'
import { theme } from '../../global/styles/theme'

export const BackgroundBlue = styled.View`
	background-color: ${theme.colors.primaryBlue};
	border-bottom-left-radius: 90px;
	height: ${RFPercentage(50)}px;
	width: ${Dimensions.get('window').width}px;
`
export const Container = styled.View`
  flex: 1;
	justify-content: center;
  align-items: center;
	margin: 0 20px;
`
export const Card = styled.View`
	background-color: ${theme.colors.typographySnow};
	width: ${Dimensions.get('window').width - 40}px;
	height: ${RFPercentage(75)}px;
	border-radius: 40px;
	margin-top: -90%;
`
export const Form = styled.View`
	flex: 1;
	justify-content: center;
	margin: 6px 20px;
`
export const Label = styled.Text`
	color: ${theme.colors.primaryBlue};
	font-size: ${RFValue(17)}px;
	font-family: ${theme.fonts.montserrat600};
`
export const Terms = styled.Text`
	font-family: ${theme.fonts.roboto300};
	font-size: ${RFValue(14)}px;
`

export const ErrorMessage = styled.Text`
	color: ${theme.colors.primaryRed};
	font-size: ${RFValue(13)}px;
`
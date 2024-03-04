import styled from 'styled-components/native';
import { theme } from '../../global/styles/theme';
import { KeyboardAvoidingView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
`;

export const Form = styled.View`
  background-color: ${theme.colors.typographySnow};
  width: 100%;
  border-radius: 20px;
  padding: 20px; 
`;

export const Label = styled.Text`
  color: #999999;
  font-size: 12px;
`;

export const ErrorMessage = styled.Text`
	color: ${theme.colors.primaryRed};
	font-size: ${RFValue(13)}px;
`;
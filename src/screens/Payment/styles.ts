import styled from 'styled-components/native'
import { KeyboardAvoidingView } from 'react-native';
import { theme } from '../../global/styles/theme';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;


export const ButtonContainer = styled.View`

`;
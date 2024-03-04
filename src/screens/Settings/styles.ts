import styled from 'styled-components/native'
import { theme } from '../../global/styles/theme'
import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 25px;
  padding: 0 18px;
  justify-content: space-between;
`
export const SettingsContainer = styled.View`
  background-color: ${theme.colors.typographySnow};
  width: 100%;
  border-radius: 20px;
`
export const Option = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  border-bottom-width: 0.3px;
  border-color: #F0F3F4;
`
export const OptionButton = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
  })`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom-width: 0.3px;
  border-color: #F0F3F4;
`;
export const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  max-width: 70%;
`
  
export const Footer = styled.View`
  margin: 15px 0 30px;
`
export const FooterText = styled.Text`
  color: #6E8CA0;
`

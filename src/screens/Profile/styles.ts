import { StyleSheet, Image } from 'react-native'
import { theme } from '../../global/styles/theme'
import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  align-items: center;
  margin: 25px 0;
  padding: 0 18px;
`
export const Content = styled.View`
  background-color: ${theme.colors.typographySnow};
  width: 100%;
  border-radius: 20px;
`
export const UserPhoto = styled.View`
  margin-bottom: 24px;
`

export const PickImageButton = styled(RectButton)`
  background-color: ${theme.colors.primaryBlue};
  width: 40px;
  height: 40px;
  border-radius: 20px;

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: -5px;
  right: -5px;
`

export const TitleButton = styled.Text`
  font-size: 14px;
  color: ${theme.colors.typographySnow};
  font-family: ${theme.fonts.montserrat500};
  text-transform: uppercase;
`

export const Form = styled.View`
  padding: 10px 26px;
`
export const Label = styled.Text`
  color: #BCC5D3;
  font-size: 12px;
`
export const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    paddingHorizontal: 18,
    borderBottomColor: '#BCC5D3',
    borderBottomWidth: 0.3,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
})


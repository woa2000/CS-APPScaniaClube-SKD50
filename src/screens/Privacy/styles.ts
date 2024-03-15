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
export const ContainerHeader = styled.View`
  flex-direction: row;
  margin: 38px;
`

export const Label = styled.Text`
  color: #BCC5D3;
  font-size: 12px;
`

export const Title = styled.Text`
  color: #000;
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  width: 100%;
`

export const SubTitle = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
  width: 100%;
`

export const Info = styled.Text`
  color: #000;
  font-size: 16px;
  margin-top: 6px;
  text-align: justify;
  width: 100%;
`

export const LI = styled.Text`
  color: #000;
  font-size: 16px;
  margin-left: 15px;
  margin-top: 6px;
  text-align: justify;
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


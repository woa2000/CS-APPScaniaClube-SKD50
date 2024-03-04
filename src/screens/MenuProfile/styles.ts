import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const Container = styled.View`
  flex: 1;
`
export const ContainerHeader = styled.View`
  flex-direction: row;
  margin: 28px;
`
export const Name = styled.Text`
  margin: 10px 0 0 30px;
  width: 60%;
  font-size: 22px;
  font-family: ${theme.fonts.montserrat500};
`
export const Content = styled.View`
  width: 80%;
  margin: 0 auto;
`
export const ButtonOption = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  align-content: center;
  border-bottom-width: 0.5px;
  padding: 28px 5px;
  width: 100%;
`
export const TitleButton = styled.Text`
  font-size: 20px;
  font-family: ${theme.fonts.montserrat500};
`
export const ContentButton = styled.View`
  margin-top: 35px;
`
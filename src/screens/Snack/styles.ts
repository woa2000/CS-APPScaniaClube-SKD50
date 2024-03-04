import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
`
export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
`

export const ContainerInfo = styled.View`
  padding: 50px;
  text-align: justify;
`
export const Title = styled.Text`
  font-family: ${theme.fonts.roboto700};
  font-size: 16px;
`
export const Description = styled.Text`
  font-family: ${theme.fonts.roboto300};
  font-size: 14px;
  line-height: 24px;
  margin: 15px 0px;
`
export const Price = styled.Text`
  font-family: ${theme.fonts.roboto700};
  margin: 15px 0px;
  font-size: 24px;
`
import { theme } from "../../global/styles/theme"
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
`
export const Information = styled.View`
  text-align: center;
  padding: 50px;
  width: 100%;
  height: 100%;
`
export const Title = styled.Text`
  font-size: 14px;
  font-family: ${theme.fonts.roboto700};
`
export const Description = styled.Text`
  font-size: 14px;
  line-height: 24px;
  margin: 15px 0;
  text-align: center;
  font-family: ${theme.fonts.roboto300};
`
export const Vacancys = styled.Text`
  font-size: 12px;
  text-align: center;
  font-family: ${theme.fonts.roboto700};
`	
export const Group = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`

export const Line = styled.View`
  border-bottom-color: #CCCCCC;
  border-bottom-width: 1px;
  margin: 10px 0;
`
export const Total = styled.Text`
  font-size: 14px;
  font-family: ${theme.fonts.roboto700};
`
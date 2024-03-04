import styled from 'styled-components/native'
import { theme } from '../../global/styles/theme'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 30px;
`
export const LabelContent = styled.View`
  flex-direction: row;
  align-items: center;
`
export const Ball = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 50px;
  margin-right: 20px;
`
export const Label = styled.Text`
  font-size: 14px;
  font-family: ${theme.fonts.montserrat500};
`
export const Timing = styled.Text`
  font-size: 14px;
  font-family: ${theme.fonts.montserrat500};
`
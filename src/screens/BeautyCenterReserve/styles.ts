import styled from 'styled-components/native'
import { theme } from '../../global/styles/theme'

export const Container = styled.View`
  flex: 1;
`
export const Content = styled.ScrollView``

export const ContentProfessional = styled.View`
  margin: 20px 20px -16px;
  flex-direction: row;
`
export const ContentInfo = styled.View`
  margin-top: 25px;
`
export const TextInfo = styled.Text`
  font-family: ${theme.fonts.montserrat500};
  font-size: 18px;
  margin-top: 5px;
`
export const Calendar = styled.View`
  margin-bottom: 5px;
`
export const Hours = styled.View`
  padding: 0 20px;
`
export const Availability = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`
export const TextAvailability = styled.Text`
  font-size: 20px;
  color: #c3c3c3;
  text-align: center;
`
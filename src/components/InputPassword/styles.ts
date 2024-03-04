import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #C8D1D3;
  width: 100%;
  border-bottom-width: 0.3px;
  padding: 4px 16px;
  margin-bottom: 10px;
`
export const Input = styled(TextInput)`
  font-size: ${RFValue(17)}px;
  color: #000;
  width: 200px;
`
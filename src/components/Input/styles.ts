import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native'

export const Container = styled(TextInput)`
  border-bottom-color: #C8D1D3;
  width: 100%;
  border-bottom-width: 0.3px;
  padding: 4px 16px;
  margin-bottom: 10px;
  font-size: ${RFValue(17)}px;
`

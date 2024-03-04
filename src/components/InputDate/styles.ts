import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { TextInputMask } from 'react-native-masked-text'

export const Container = styled(TextInputMask)`
  border-bottom-color: #C8D1D3;
  width: 100%;
  border-bottom-width: 0.3px;
  padding: 4px 16px;
  margin-bottom: 10px;
  font-size: ${RFValue(17)}px;
`

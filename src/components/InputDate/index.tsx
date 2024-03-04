import React from 'react'
import { TextInputMaskProps } from 'react-native-masked-text'
import { Container } from './styles'

type Props = TextInputMaskProps 

export function InputDate({ ...rest } : Props) {
  return (
    <Container {...rest} />
  )
}
import React, { useState } from 'react'
import { TextInputProps, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { Container, Input } from './styles'

type Props = TextInputProps 

export function InputPassword({ ...rest } : Props) {
  const [hidePass, setHidePass] = useState(true)
  return (
    <Container>
      <Input {...rest} secureTextEntry={hidePass} />
      <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
        {
          hidePass ?
          <Feather name="eye-off" size={20} color="#999"/>
          :
          <Feather name="eye" size={20} color="#999"/>
        }
      </TouchableOpacity>
    </Container>
  )
}
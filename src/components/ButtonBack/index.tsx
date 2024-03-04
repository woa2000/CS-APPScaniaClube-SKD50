import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { styles } from './styles'

type Props = TouchableOpacityProps

export function ButtonBack({ ...rest }: Props) {
  return (
    <TouchableOpacity  activeOpacity={0.7} style={styles.container} {...rest}>
      <Feather name="arrow-left" size={24} color="#D90915" />
    </TouchableOpacity>
  )
}
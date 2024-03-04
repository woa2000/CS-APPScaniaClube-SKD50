import React, { useState } from 'react'
import { View } from 'react-native'
import InputSpinner from 'react-native-input-spinner'
import { theme } from '../../global/styles/theme'

import { 
  Container,
  Price
} from './styles'

interface ItemGroupReserveProps {
  title: string
  price: number
  vacancy: number
  value: number
  onChangeValue: (value: number) => void
}

export function ItemGroupReserve({ 
  title, 
  price, 
  vacancy,
  value,
  onChangeValue
}: ItemGroupReserveProps) {

  return (
    <View>
      <Container>
        <View>
          <Price>{ title }</Price>
          <Price>{ price > 0 ? `R$ ${price.toFixed(2)}` : 'GRATUITO' }</Price>
          <Price>{ value } / { vacancy }</Price>
        </View>
        <InputSpinner
          min={0}
          max={vacancy}
          rounded={false}
          value={value}
          onChange={onChangeValue}
          color={theme.colors.primaryBlue}
          buttonFontSize={19}
          height={32}
          width={90}
          showBorder={true}
        />
      </Container>
    </View>
  )
}

  
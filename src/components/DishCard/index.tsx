import React, { useState } from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { 
  Container,
  ImgCard,
  InfoBar,
  TitleCard,
  Price,
} from './styles'

interface Props extends RectButtonProps {
  image: string
  titleCard: string
  price: string
}

export function DishCard({ image, titleCard, price, ...rest }: Props) {
  
  return (
    <Container 
      {...rest}
    >
      <ImgCard
        uri={image}
      />
      <InfoBar>
        <TitleCard>{titleCard}</TitleCard>
        <Price>{price}</Price>
      </InfoBar>
    </Container>
  )
}
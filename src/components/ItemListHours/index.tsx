import React from 'react'

import { 
  Container,
  Information,
  Ball,
  Dates,
  Hours,
  Contact,
} from './styles'

interface Props {
  date?: string
  hour?: string
}

export function ItemListHours({ 
  date, 
  hour, 
}: Props) {
  return (
    <Container>
      <Information>
        <Ball />
        <Dates>{date}</Dates>
      </Information>
      <Hours>{hour}</Hours>
    </Container>
  )
}
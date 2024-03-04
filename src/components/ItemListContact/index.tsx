import React from 'react'

import { 
  Container,
  Information,
  Ball,
  Contact,
} from './styles'

interface Props {
  contact?: object
}

export function ItemListContact({ 
  contact, 
}: Props) {
  return (
    <Container>
      <Information>
        <Ball />
        <Contact>{contact}</Contact>
      </Information>
    </Container>
  )
}
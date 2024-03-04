import React from 'react'

import {
  Container,
  LabelContent,
  Ball,
  Label,
  Timing
} from './styles'

interface ItemListActivityProps {
  label: string
  timing: number
  ball: string
}

export function ItemListActivity({ label, timing, ball }: ItemListActivityProps) {
  return (
    <Container>
      <LabelContent>
        <Ball style={{backgroundColor: ball}}/>
        <Label>
          {label}
        </Label>
      </LabelContent>
      <Timing>{timing} min</Timing>
    </Container>
  )
}
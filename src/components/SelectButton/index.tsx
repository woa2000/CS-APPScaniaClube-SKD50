import React from 'react'

import {
  Container,
  Training,
  Icon,
} from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

export function SelectButton({ title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Training>{title}</Training>
      <Icon name="chevron-down" />
    </Container>
  )
}
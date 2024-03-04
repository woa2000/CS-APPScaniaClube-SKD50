import React from 'react';
import { View } from 'react-native';

import {
  Container,
  StatusContainer,
  Status,
  Content,
  Label,
  Item,
} from './styles';

interface ExamCardProps {
  type: 'waiting' | 'authorized' | 'refused';
  status: string;
  title: string;
  validate: string;
  sendDate: string;
  onPress: () => void;
}

export function ExamCard({
  type,
  status,
  title,
  validate,
  sendDate,
  onPress,
} : ExamCardProps) {
  return (
    <Container onPress={onPress}>
       <StatusContainer
          type={type}
        >
          <Status>
            { status }
          </Status>
        </StatusContainer>

      <Content>
        <Label>Atividade</Label>
        <Item>{ title }</Item>

        <Label>Validade</Label>
        <Item>{ validate }</Item>
      </Content>

      <Content>
        <Label>Data do envio</Label>
        <Item>{ sendDate }</Item>
      </Content>
    </Container>
  )
}
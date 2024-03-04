import React from 'react'

import { 
  TouchableOpacity, 
  TouchableOpacityProps 
} from 'react-native'

import { 
  styles,
  Container,
  Avatar,
  ContainerTitle,
  Title
} from './styles'

type Props = TouchableOpacityProps & {
  urlImage: string
  name?: string
}

export function AvatarProfessional({ name, urlImage, ...rest }: Props) {
  return (
    <Container>
      <TouchableOpacity {...rest} style={styles.avatar}>
        <Avatar
          preview={{ uri: urlImage }}
          tint="light"
          uri={urlImage}
        />
      </TouchableOpacity>
      <ContainerTitle>
        <Title>
          {name}
        </Title>
      </ContainerTitle>
    </Container>
  )
}
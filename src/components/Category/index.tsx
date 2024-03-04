import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { Image } from 'react-native-expo-image-cache'
import { styles } from './styles'

type Props = RectButtonProps & {
  urlImage: string
  title?: string
}

export function Category({ urlImage, title, ...rest  }: Props) {
  return (
    <RectButton 
      style={styles.container}
      {...rest}
    >
      <Image
        style={styles.image}
        uri={urlImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </RectButton>
  )
}
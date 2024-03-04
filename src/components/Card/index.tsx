import React from 'react'
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import { styles } from './styles'

type Props = TouchableOpacityProps & {
  name?: string
  urlImage: string
}

export function Card({ name, urlImage, ...rest }: Props) {
  return (
    <TouchableOpacity 
      {...rest} 
      activeOpacity={0.7} 
      style={styles.container}
    >
      <View style={styles.content}>
        <Image 
          uri={urlImage}
          style={styles.image} 
        />
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}
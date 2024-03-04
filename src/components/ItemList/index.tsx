import React from 'react'
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { styles } from './styles'

type Props = TouchableOpacityProps & {
  date: string
  title: string
  showButtonActivity?: boolean
  showButtonCancel?: boolean
  onPressActivity?: () => void
  onPressCancel?: () => void
}

export function ItemList({ 
  date, 
  title, 
  showButtonActivity, 
  showButtonCancel, 
  onPressActivity,
  onPressCancel,
}: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.buttons}>
        {
          showButtonActivity ? (
            <TouchableOpacity 
              onPress={onPressActivity}
              style={styles.buttonActivity}
            >
              <Feather name="activity" color={'#FFF'} size={24} />
            </TouchableOpacity>
          ) : (
            <View />
          )
        }
        
        {
          showButtonCancel ? (
            <TouchableOpacity 
              onPress={onPressCancel}
              style={styles.buttonDelete}
            >
            <Feather name="x" color={'#FFF'} size={24} />
          </TouchableOpacity>
          ) : (
            <View />
          )
        }
        
      </View>
    </View>
  )
}
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Modal from "react-native-modal"

import { styles } from './styles'

type Props = TouchableOpacityProps & {
  title?: string | undefined
  message?: string | undefined
  showButtonCancel?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  visible: boolean
}

export function AlertCustom({ 
  visible, 
  title, 
  message, 
  onConfirm,
  onCancel,
  showButtonCancel = false, 
  ...rest 
}: Props) {

  return (
    <View>
      <Modal 
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={visible}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          { showButtonCancel ? (
            <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
                <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
            ) : (
              <View />
            )
          }
          
          <TouchableOpacity 
            {...rest}
            onPress={onConfirm}
            style={styles.button}
          >
            <Feather name="check" size={24} color='#fff'/>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

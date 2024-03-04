import React from 'react'
import { View, TextInput, TextInputProps, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { styles } from './styles'

type Props = TextInputProps & TouchableOpacityProps &{
    placeholder: string,
}

export function SeachBar({ placeholder, ...rest }: Props) {
    
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput 
                    {...rest}
                    style={styles.textInput} 
                    placeholder={placeholder}
                />
                <TouchableOpacity 
                    {...rest} 
                    style={styles.button}
                >
                    <Feather name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
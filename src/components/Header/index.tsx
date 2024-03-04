import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { styles } from './styles'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


type Props = {
    showBack?: boolean
    title?: string
    showConfig?: boolean
}

export function Header({ showBack = true, title, showConfig = false } : Props){
    const navigation = useNavigation()
    
    function handleToSettings(){
        navigation.navigate('Settings')
    }
    
    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="dark-content"
            />
            { showBack ? (
                <BorderlessButton
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" size={24} color="#0a0a0a"/>
                </BorderlessButton>
            ) : (
                <View 
                    style={{
                        width: 24,
                    }}
                />
            )}
            
            <Text style={styles.title}>{title}</Text>

            { showConfig ? (
                <BorderlessButton
                    onPress={handleToSettings}
                >
                    <Feather name="settings" size={24} color="#757575" />
                </BorderlessButton>
            ) : (
                <View 
                    style={{
                        width: 24,
                    }}
                />
            )}
        </View>
    )
}
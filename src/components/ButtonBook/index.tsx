import React from 'react'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { 
    Text, 
    ActivityIndicator,
    ActivityIndicatorProps
 } from 'react-native'

import { styles } from './styles'

type Props = RectButtonProps & ActivityIndicatorProps & {
    title: string;
    loading?: boolean;
    isSchedule?: boolean;
}

export function ButtonBook({ title, loading, isSchedule, ...rest } : Props) {
    return (
        <RectButton 
            style={isSchedule ? styles.containerRed : styles.container}
            enabled={!loading}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator 
                    size="large" 
                    color="#FFF"
                    animating={loading}
                />
            ) : (
                <Text style={styles.title}>
                    { title }
                </Text>
            )}
        </RectButton>
    )
}
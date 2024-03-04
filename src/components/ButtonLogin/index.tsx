import React, { useState } from 'react'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { 
    Text,
    ActivityIndicator,
    ActivityIndicatorProps,
 } from 'react-native'
 

import { styles } from './styles'

type Props = RectButtonProps & ActivityIndicatorProps & {
    title: string;
    loading?: boolean;
}

export function ButtonLogin({ title, loading, ...rest } : Props) {

    return (
        <RectButton 
            style={styles.container}
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
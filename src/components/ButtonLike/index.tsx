import React from 'react'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import {ActivityIndicatorProps } from 'react-native'


import { styles } from './styles'

type Props = RectButtonProps & ActivityIndicatorProps & {
    isLiked?: boolean;
    loading?: boolean;
}

export function ButtonLike({ isLiked, loading, ...rest } : Props) {
    return (
        <RectButton 
            style={styles.favorite}
            enabled={!loading}
            {...rest}
        >
            {
                isLiked ? (
                    <FontAwesome name="heart" size={18} color="#D90404" />
                ) : (
                    <FontAwesome name="heart-o" size={18} color="#D90404" />
                )
            }
        </RectButton>
        
    )
}
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import { BlurView } from 'expo-blur'

import { styles } from './styles'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ButtonBack } from '../ButtonBack'
import { useNavigation } from '@react-navigation/native'

type Props = TouchableOpacityProps & {
  icon?: string,
  defaultIcon?: string,
  customIconSize?: number,
  urlImage: string,
  title: string,
  subtitle: string | undefined,
  date?: string,
  showButtonBack?: boolean
}

export function BannerPromotion({ 
  icon,
  defaultIcon = 'compass',
  customIconSize = 70,
  urlImage, 
  title, 
  subtitle, 
  date, 
  showButtonBack = false,
  ...rest } : Props) {
  const navigation = useNavigation()
  const validIconNames = Object.keys(FontAwesome.glyphMap) as string[]
	type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>['name']
	let iconName: FontAwesomeIconName
	iconName = (defaultIcon as FontAwesomeIconName)
	
	if (icon) {
		const parts = icon.split(' ');
		if (parts.length > 1) {
			icon = parts[1].replace('fa-', '')
			if (validIconNames.includes(icon)) {
				iconName = icon as FontAwesomeIconName
			}
    }
	}
  
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Image 
        style={styles.image}
        uri={urlImage}
      />
      {
        showButtonBack ? (
          <View style={styles.buttonBack}>
            <ButtonBack 
              onPress={() => navigation.goBack()}
            />
          </View>
        ) : (
          <View />
        )
      }
      <BlurView intensity={90} tint="dark" style={styles.content}>
        <View style={styles.contentIcon}>
          {/* <Image 
            uri={'https://img.icons8.com/color/480/scania.png'}
            style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }} 
          /> */}
          <FontAwesome name={iconName} size={customIconSize} color="#d97d54" />
        </View>
        <View>
          {
            title?.length > 250 ? (
              <Text style={styles.title}>
                {title.substring(0, 250)}...
              </Text>
            ) : (
              <Text style={styles.title}>
                {title}
              </Text>
            )
          }

          <View style={styles.line}/>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
          <Text style={styles.date}>
            {date}
          </Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  )
}
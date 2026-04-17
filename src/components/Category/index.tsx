import React from 'react'
import { View, Text, useWindowDimensions, ImageStyle } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { Image } from 'react-native-expo-image-cache'
import RenderHTML from 'react-native-render-html'
import { styles } from './styles'

type Props = RectButtonProps & {
  urlImage?: string
  title?: string
  titleHtml?: string
}

function containsHtml(value: string): boolean {
  return /<[^>]+>/.test(value)
}

export function Category({ urlImage, title, titleHtml, children, ...rest }: Props) {
  const { width } = useWindowDimensions()
  const htmlContent = (titleHtml ?? '').trim()
  const shouldRenderHtml = htmlContent.length > 0 && containsHtml(htmlContent)

  return (
    <RectButton 
      style={styles.container}
      {...rest}
    >
      {!!urlImage && (
        <Image
          style={styles.image as ImageStyle}
          uri={urlImage}
        />
      )}
      <View style={styles.content}>
        {shouldRenderHtml ? (
          <RenderHTML
            contentWidth={width}
            source={{ html: htmlContent }}
            tagsStyles={htmlTagsStyles}
          />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
        {children}
      </View>
    </RectButton>
  )
}

const htmlTagsStyles = {
  p: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 13,
    marginRight: 8,
    color: '#334856',
    fontSize: 20,
  },
  span: {
    color: '#334856',
    fontSize: 20,
  },
  strong: {
    color: '#334856',
  },
  b: {
    color: '#334856',
  },
  em: {
    color: '#334856',
  },
  i: {
    color: '#334856',
  },
}
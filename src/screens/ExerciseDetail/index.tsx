import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import { Dimensions } from 'react-native'

import {
  Container,
  VideoContainer,
  Content,
  Title,
  Header,
  Description,
} from './styles'

import * as academyService from '../../services/academy'
import { ExerciseDetailProps } from '../../interfaces/interfaces'
// import SkeletonContent from 'react-native-skeleton-content'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function ExerciseDetail() {
  const route = useRoute()
  const params = route.params as ExerciseDetailProps
  const [exercise, setExercise] = useState<ExerciseDetailProps>({} as ExerciseDetailProps)
  const [loading, setLoading] = useState(true)
  const [video, setVideo] = useState('')

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function loadExercise(id: string) {
    const response = await academyService.getExercise(id)
    setExercise(response as ExerciseDetailProps)
    setVideo(response.linkVideo)
  }

  useEffect(() => {
    loadExercise(params.id)
      .then(() => setLoading(false))
  }, [])

  return (
    <Container>
      {/* <SkeletonContent
        containerStyle={{ flex: 1, width: '100%', height: '100%' }}
        animationDirection="horizontalRight"
        isLoading={loading}
        layout={[
          { 
            key: 'banner', 
            width: Dimensions.get('window').width, 
            height: 212, 
            marginBottom: 20 
          },
          { 
            key: 'titleAndButton', 
            width: 180, 
            height: 20,
            marginHorizontal: 20, 
            marginBottom: 20 
          },
          { 
            key: 'subtitle', 
            width: Dimensions.get('window').width - 50, 
            height: 20,
            marginHorizontal: 20, 
            marginBottom: 5 
          },
          { 
            key: 'line1', 
            width: Dimensions.get('window').width - 50, 
            height: 20,
            marginHorizontal: 20,
            marginBottom: 5 
          },
          { 
            key: 'line2', 
            width: Dimensions.get('window').width -50, 
            height: 20,
            marginHorizontal: 20,
            marginBottom: 5 
          },
          { 
            key: 'line3', 
            width: Dimensions.get('window').width - 50, 
            height: 20,
            marginHorizontal: 20,
            marginBottom: 5 
          },
        ]}
      > */}
        <VideoContainer>
          <WebView
            style={{
              width: Dimensions.get('window').width,
              height: 212
            }}
            javaScriptEnabled={true}
            allowsBackForwardNavigationGestures
            source={{
              uri: `${video}?modestbranding=1&autoplay=0&showinfo=0&controls=1&fs=0`
            }}
          />
        </VideoContainer>

        <Content>
          <Title>
            {td(exercise.name, exercise.name_EN)}
          </Title>
          <Header>
            {t("Informações")}
          </Header>

          <Description>
            {td(exercise.description, exercise.description_EN)}
          </Description>
        </Content>
      {/* </SkeletonContent> */}
    </Container>
  )
}
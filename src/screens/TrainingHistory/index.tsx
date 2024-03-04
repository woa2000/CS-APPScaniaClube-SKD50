import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { BannerActivity } from '../../components/BannerActivity'
import { ItemListTraining } from '../../components/ItemListTraining'
import { ActivityDetailParams, ExerciseProps } from '../../interfaces/interfaces'
import * as academyService from '../../services/academy'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


import { 
  Container,
  ExerciseList,
  Title,
  List,
  ErrorMessage,
} from './styles'

export function TrainingHistory() {
  const route = useRoute()
  const navigation = useNavigation()
  const params = route.params as ActivityDetailParams
  const [listTraining, setListTraining] = useState<ExerciseProps>({} as ExerciseProps)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function loadTraining(id: string){
    const response = await academyService.getSheetClassByScheduling(id)
    setListTraining(response as ExerciseProps)
    setDate(params.date.substring(0,10))
    setTitle(params.title)
  }

  async function handleLikeActivity() {
    return false
  }

  useEffect(() => {
    loadTraining(params.id)
  }, [])

  return (
    <Container>
      <BannerActivity 
        urlImage="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"
        title={title}
        showFavorite={false}
        handleLikeActivity={() => handleLikeActivity()}
      />

      <ExerciseList>
        <Title>
          {date}
        </Title>
                
        <List>
          {
            listTraining.listExercises ? (
              listTraining.listExercises.length > 0 ?
              listTraining.listExercises.map(item => (
                <ItemListTraining
                  key={item.id}
                  text={td(item.name, item.name_EN)}
                  section={item.repettition}
                  visibleCheckBox={false}
                  onPress={() => navigation.navigate('ExerciseDetail', { id: item.id })}
                />
              )) : (
                  <View>
                    <ErrorMessage>
                      {t("Nenhum treino cadastrado")}
                    </ErrorMessage>
                  </View>
                )
            ) : (
              <View/>
            )
          } 
        </List>
      </ExerciseList>
    </Container>
  )
} 
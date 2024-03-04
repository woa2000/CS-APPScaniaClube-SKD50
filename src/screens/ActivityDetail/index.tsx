import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Modal, View } from 'react-native'
import { BannerActivity } from '../../components/BannerActivity'
import { ItemListTraining } from '../../components/ItemListTraining'
import { TrainingSelectButton } from '../../components/TrainingSelectButton'
import { ActivityDetailParams, ExerciseProps } from '../../interfaces/interfaces'
import { TrainingSelect } from '../TrainingSelect'

import * as academyService from '../../services/academy'

import { 
  Container,
  ContainerSearchBar,
  ExerciseList,
  Title,
  List,
} from './styles'
import { useAuth } from '../../contexts/auth'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


interface TrainingSelect {
  id: string
  name: string
}

export function ActivityDetail() {
  const route = useRoute()
  const { user } = useAuth()
  const navigation = useNavigation()
  const params = route.params as ActivityDetailParams
  const [trainingModalOpen, setTrainingModalOpen] = useState(false)
  const [listTraining, setListTraining] = useState<ExerciseProps>({} as ExerciseProps)
  const [training, setTraining] = useState<TrainingSelect>({} as TrainingSelect)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function handleLikeActivity() {
    return false
  }

  async function loadTraining(){
    const response = await academyService.getSheetClassBySchedulingAndUser(params.id, user?.id as string)
    setListTraining(response as ExerciseProps)
    setTraining(response as TrainingSelect)
    setDate(params.date.substring(0,10))
    setTitle(params.title)
  }
  
  async function loadSheetTraining(id: string) {
    const listSelected = await academyService.getSheetClass(id)
    setListTraining(listSelected as ExerciseProps)
    try{
      await academyService.updatedClassSheet(params.id, training.id)
    } catch(err){
      console.log(err)
    }
  }

  function handleOpenSelectTrainingModal() {
    setTrainingModalOpen(true)
  }

  function handleCloseSelectTrainingModal() {
    loadSheetTraining(training.id)
    setTrainingModalOpen(false)
  }
  
  useEffect(() => {
    loadTraining().then(() => {
      
    })
  }, [])

  return (
    <Container>
      <BannerActivity 
        urlImage="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"
        title={title}
        showFavorite={false}
        handleLikeActivity={() => handleLikeActivity()}
      />

      <ContainerSearchBar>
        <TrainingSelectButton 
          title={training.name}
          onPress={handleOpenSelectTrainingModal}
        />
      </ContainerSearchBar>

      <ExerciseList>
        <Title>
          {date}
        </Title>
        
        <List>
          {
            listTraining.listExercises ? (
              listTraining.listExercises.length > 0 &&
              listTraining.listExercises.map(item => (
                <ItemListTraining
                  key={item.id}
                  text={td(item.name, item.name_EN)}
                  section={item.repettition}
                  visibleCheckBox
                  toggleCheckbox={() => {}}
                  onPress={() => navigation.navigate('ExerciseDetail', { id: item.id })}
                />
              ))
            ) : (
              <View />
            )
          } 
        </List> 
      </ExerciseList>

      <Modal 
        visible={trainingModalOpen}
        statusBarTranslucent
      >
        <TrainingSelect  
          training={training}
          setTraining={setTraining}
          closeSelectTraining={handleCloseSelectTrainingModal}
        />
      </Modal>
    </Container>
  )
} 
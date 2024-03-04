import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import * as academyService from '../../services/academy'

import {
  Container,
  Header,
  Title,
  Footer,
  Training,
  Icon,
  Name,
  Separator,
  Button,
  ButtonText
} from './styles'
import { useAuth } from '../../contexts/auth'
import { SheetTrainingProps } from '../../interfaces/interfaces'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


interface TrainingSelect {
  id: string
  name: string
}

interface TrainingSelectProps {
  training: TrainingSelect
  setTraining: (training: TrainingSelect) => void
  closeSelectTraining: () => void
}

export function TrainingSelect({
  training,
  setTraining,
  closeSelectTraining
} : TrainingSelectProps) {
  const { user } = useAuth()
  const [listTraining, setListTraining] = useState<SheetTrainingProps[]>([] as SheetTrainingProps[])

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function loadListTraining(userId: string) {
    const response = await academyService.getListSheetClass(userId)
    setListTraining(response as SheetTrainingProps[])
  }

  function handleSelectTraining(training: TrainingSelect) {
    setTraining(training)
  }

  useEffect(() => {
    loadListTraining(user?.id as string)
  }, [])

  return (
    <Container>
      <Header>
        <Title>{t("Selecione seu treino")}</Title>
      </Header>

      <FlatList 
        data={listTraining}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Training
            onPress={() => handleSelectTraining(item)}
            isActive={training.id === item.id}
          >
            <Icon 
              name='dumbbell'
              isActive={training.id === item.id}
            />
            <Name
              isActive={training.id === item.id}
            >
              {item.name}
            </Name>
          </Training>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button 
          onPress={closeSelectTraining}
        >
          <ButtonText>
            {t("Selecionar")}
          </ButtonText>
        </Button>
      </Footer>
    </Container>
  )
}
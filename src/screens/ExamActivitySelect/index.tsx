import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { ExamNeedActivityProps } from '../../interfaces/interfaces';

import * as examService from '../../services/exams';

import {
  Container,
  Header,
  Title,
  Footer,
  Training,
  Name,
  Separator,
  Button,
  ButtonText
} from './styles'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


interface ActivitySelect {
  id: string
  description: string
}

interface ActivitySelectProps {
  activity: ActivitySelect
  setActivity: (activity: ActivitySelect) => void
  closeSelectActivity: () => void
}

export function ExamActivitySelect({
  activity,
  setActivity,
  closeSelectActivity
} : ActivitySelectProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<ExamNeedActivityProps[]>([] as ExamNeedActivityProps[]);

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };

  
  function handleSelectTraining(activity: ActivitySelect) {
    setActivity(activity)
  }

  async function loadActivities() {
    setIsLoading(true);

    await examService.getActivityNeedExam()
      .then(response => {
        const activities = response.map(activity => {
          return {
            id: activity.id,
            description: activity.description,
            description_EN: activity.description_EN
          }
        })

        setActivities(activities);
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    loadActivities().then(() => {
      setIsLoading(false);
    })
  }, [])

  return (
    <Container>
      <Header>
        <Title>{t("Selecione a atividade")}</Title>
      </Header>

      {
        isLoading ?
          (
            <></>
          ) : (
            <FlatList 
              data={activities}
              style={{ flex: 1, width: '100%' }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Training
                  onPress={() => handleSelectTraining(item)}
                  isActive={activity.id === item.id}
                >
                  <Name
                    isActive={activity.id === item.id}
                  >
                    {item.description}
                  </Name>
                </Training>
              )}
              ItemSeparatorComponent={() => <Separator />}
            />
          )
      }

      <Footer>
        <Button 
          onPress={closeSelectActivity}
        >
          <ButtonText>
          {t("Selecionar")}
          </ButtonText>
        </Button>
      </Footer>
    </Container>
  )
}
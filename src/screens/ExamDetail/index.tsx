import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Image } from 'react-native';

import { ButtonStandard } from '../../components/ButtonStandard';

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


import {
  Container,
} from './styles';

interface ExamDetailProps {
  image: string;
}

export function ExamDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as ExamDetailProps;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('');

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function loadImages() {
    setIsLoading(true);
    
    return setData(params.image);
  }

  useFocusEffect(useCallback(() => {
    loadImages().then(() => {
      setIsLoading(false);
    });
  }, []));

  return (
    <Container>
      {
        isLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
          />
        ) : (
          <Image 
            source={{ uri: data }}
            resizeMode="contain"
            style={{
              width: '95%',
              height: 200, 
              margin: 10,
              borderRadius: 5
            }}
          />
        )
      }
      
      <ButtonStandard
        title={t("Fechar")}
        onPress={() => navigation.navigate('Exams')}
      />
    </Container>
  )
}
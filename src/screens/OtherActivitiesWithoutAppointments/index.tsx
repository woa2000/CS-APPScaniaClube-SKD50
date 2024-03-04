import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
// import SkeletonContent from 'react-native-skeleton-content';
import { Dimensions, ScrollView } from 'react-native';

import { BannerPromotion } from '../../components/BannerPromotion';
import { ButtonStandard } from '../../components/ButtonStandard';

import { useAuth } from '../../contexts/auth';

import { Activity } from '../../interfaces/interfaces';

import * as activityService from '../../services/activity'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';

import RenderHtml from 'react-native-render-html';



import {
  Container,
  Content,
  Title,
  Description,
} from './styles';

export function OtherActivitiesWithoutAppointments() {
  const [loading, setLoading] = useState(true)
  const [activity, setActivity] = useState<Activity>({} as Activity)
  const [source, setSource] = useState({html: ''} as any);
  const {fileServer, setTitleHeader, user} = useAuth()
  const navigation = useNavigation();
  const route = useRoute()
  const params = route.params as Activity;

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function loadActivity(id: string) {
    try{
      const response = await activityService.getActivity(id, user?.id as string)
      setActivity(response as Activity);
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    setTitleHeader(params.description as string)
    setSource({html: td(params.description, params.description_EN)})
    loadActivity(params.id as string)
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
            height: 297, 
            marginBottom: 10 
          },
          {
            key: 'searchBar',
            width: '100%',
            height: 80,
            marginBottom: 20,
          },
          { 
            key: 'card', 
            width: '90%', 
            height: 80, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 10 
          },
          { 
            key: 'card2', 
            width: '90%', 
            height: 80, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 10 
          },
          { 
            key: 'card3', 
            width: '90%', 
            height: 80, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 10 
          }
        ]}
      > */}
        <ScrollView>
          <BannerPromotion 
            title={td(activity.description, activity.description_EN)}
            icon={activity.icon}
            urlImage={fileServer + activity.image}
            subtitle={params.subtitle}
            activeOpacity={0.7}
            showButtonBack={true}
          />
        
          <Content>
            <Title>
              {t("Informações")}
            </Title>
            <Description>
              <RenderHtml 
                contentWidth={100}
                source={source}
              />
            </Description>

            <ButtonStandard
              title={t("Voltar")}
              onPress={() => navigation.goBack()}
            />
          </Content>
        </ScrollView>
      {/* </SkeletonContent> */}
    </Container>
  );
}
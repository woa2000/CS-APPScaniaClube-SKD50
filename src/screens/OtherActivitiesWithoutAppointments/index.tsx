import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
// import SkeletonContent from 'react-native-skeleton-content';
import { ScrollView, useWindowDimensions } from 'react-native';

import { BannerPromotion } from '../../components/BannerPromotion';
import { ButtonStandard } from '../../components/ButtonStandard';

import { useAuth } from '../../contexts/auth';

import { Activity } from '../../interfaces/interfaces';

import * as activityService from '../../services/activity'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';

import RenderHtml from 'react-native-render-html';

import * as partnershipService from '../../services/partnership'



import {
  Container,
  Content,
  Title,
  Description,
} from './styles';

export function OtherActivitiesWithoutAppointments() {
  const [loading, setLoading] = useState(true)
  const [activity, setActivity] = useState<Activity>({} as Activity)
  const [source, setSource] = useState<{ html: string }>({ html: '' });
  const {fileServer, setTitleHeader, user} = useAuth()
  const { width } = useWindowDimensions()
  const navigation = useNavigation();
  const route = useRoute()
  const params = route.params as Activity & {
    type?: string,
    title?: string,
    subtitle_EN?: string,
    image?: string,
  };

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string = '', en: string = '') => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };

  function setHtmlSource(pt?: string, en?: string) {
    setSource({ html: td(pt ?? '', en ?? '') })
  }


  async function loadActivity(id: string) {
    try{
      const response = await activityService.getActivity(id, user?.id as string)
      setActivity(response as Activity);
      setHtmlSource(
        response.detailActivities?.description,
        response.detailActivities?.description_EN
      )
    }catch(error){
      console.log(error)
    }
  }

  async function loadPartnership(id: string) {
    try {
      const response = await partnershipService.getPartnershipById(id)

      if (!response) {
        return
      }

      setActivity({
        id: response.id,
        description: response.nome || response.description || '',
        description_EN: response.nome || response.description_EN || response.description || '',
        image: response.image || '',
        icon: '',
        isLiked: false,
        subtitle: response.tipo?.description,
        detailActivities: {
          subtitle: response.tipo?.description,
          subtitle_EN: response.tipo?.description_EN,
          description: response.description,
          description_EN: response.description_EN,
        },
      })

      setHtmlSource(response.description, response.description_EN)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTitleHeader((params.title || params.description) as string)
    setHtmlSource(params.description, params.description_EN)

    const loader = params.type === 'partnership'
      ? loadPartnership(params.id as string)
      : loadActivity(params.id as string)

    loader
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
            title={td(
              activity.description || params.title || '',
              activity.description_EN || params.title || ''
            )}
            icon={activity.icon}
            urlImage={fileServer + (activity.image || params.image || '')}
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
                contentWidth={Math.max(width - 100, 220)}
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
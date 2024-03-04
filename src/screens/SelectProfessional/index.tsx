import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// import SkeletonContent from 'react-native-skeleton-content'
import { FlatGrid } from 'react-native-super-grid'


import { 
  View, 
  Text, 
  Dimensions 
} from 'react-native'

import { 
  Activity, 
  NavigationParams, 
  Professional 
} from '../../interfaces/interfaces'

import { AvatarProfessional } from '../../components/AvatarProfessional'
import * as beautyCenterService from '../../services/beautyCenter'
import { BannerActivity } from '../../components/BannerActivity'
import { useAuth } from '../../contexts/auth'
import { styles } from './styles'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function SelectProfessional() {
  const route = useRoute()
  const navigation = useNavigation()
  const { fileServer, user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [activity, setActivity] = useState<Activity>({} as Activity)
  const [professionals, setProfessionals] = useState<Professional[]>([] as Professional[])
  
  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function loadActivity(id: string) {
    try{
      const response = await beautyCenterService.getBeautyCenterActivityWithLike(id, user?.id as string)
      setActivity(response as Activity);
    }catch(error){
      console.log(error)
    }
  }
  
  async function loadProviders(id: string) {
    try {
      const response = await beautyCenterService.getProviders(id)
      setProfessionals(response as Professional[])
    }
    catch (error) {
      console.log(error)
    }
  }

  async function handleLikeActivity(activityId: string, isLiked: boolean) {
    try{
      await beautyCenterService.likeActivity(activityId, user?.id as string, isLiked)
      .then((response) => {
        if(response.success) {
          return true
        }
      })
    } catch(error){
      console.log(error)
    }
    return false
  }
  
  useEffect(() => {
    const params = route.params as NavigationParams
    loadActivity(params.id as string)
    loadProviders(params.id as string)
      .then(() => {
        setLoading(false)
    })
  }, [])

  return (
    <View style={styles.container}>
      {/* <SkeletonContent
        containerStyle={{ flex: 1, width: '100%', height: '100%' }}
        animationDirection="horizontalRight"
        isLoading={loading}
        layout={[
          { 
            key: 'banner', 
            width: Dimensions.get('window').width, 
            height: 267, 
            marginBottom: 20 
          },
          { 
            key: 'titleAndButton', 
            width: 260, 
            height: 20,
            marginHorizontal: 25, 
            marginBottom: 20 
          },
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginHorizontal: 25,
            marginBottom: 20,
            children: [
              {
                width: 80,
                height: 80,
                marginRight: 23,
                borderRadius: 50,
                marginBottom: 30
              },
              {
                width: 80,
                height: 80,
                marginRight: 23,
                borderRadius: 50,
              },
              {
                width: 80,
                height: 80,
                marginRight: 23,
                borderRadius: 50,
              },
              {
                width: 80,
                height: 80,
                marginRight: 23,
                borderRadius: 50,
              },
              {
                width: 80,
                height: 80,
                marginRight: 23,
                borderRadius: 50,
              },
              {
                width: 80,
                height: 80,
                marginRight: 23,
                borderRadius: 50,
              },
            ]
          }
        ]}
      > */}
        <BannerActivity 
            urlImage={fileServer + activity.image}
            icon={activity.icon}
            title={td(activity.description, activity.description_EN)}
            isLiked={activity.isLiked}
            handleLikeActivity={() => handleLikeActivity(
              activity.id as string, 
              activity.isLiked
            )}
          />

        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.text}>{t("Selecione o profissional desejado")}</Text>
          </View>
          <FlatGrid
              data={professionals}
              showsVerticalScrollIndicator={false}
              itemDimension={92}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <AvatarProfessional
                  name={item.nome}
                  urlImage={fileServer + item.imgPerfil}
                  onPress={() => navigation.navigate('BeautyCenterReserve', { 
                    id: activity.id,
                    provider: {
                      id: item.id,
                      nome: item.nome,
                      imgPerfil: item.imgPerfil
                    }}
                  )}
                />
              )}
            />
        </View>
      {/* </SkeletonContent> */}
    </View>
  )
}

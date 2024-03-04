import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// import SkeletonContent from 'react-native-skeleton-content'

import { 
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native'

import { NavigationParams, Activity } from '../../interfaces/interfaces'
import { BannerActivity } from '../../components/BannerActivity'
import * as activityService from '../../services/activity'
import { Category } from '../../components/Category'
import { SeachBar } from '../../components/SeachBar'
import { useAuth } from '../../contexts/auth'
import { Card } from '../../components/Card'
import { styles } from './styles'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function OtherActivitys() {
  const route = useRoute()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const {fileServer, setTitleHeader, titleHeader, user} = useAuth();
  const [lastReservations, setLastReservations] = useState<Activity[]>({} as Activity[]);
  const [activities, setActivities] = useState<Activity[]>({} as Activity[]);

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function loadActivities(type: string) {
    try{
      const response = await activityService.getActivityPage(user?.id as string, type);
      setActivities(response.activities as Activity[]);
      setLastReservations(response.lastReservations as Activity[]);
    }catch(error){
      console.log(error)
    }
  }

  async function handleLikeActivity() {
    return false
  }

  useEffect(() => {
    const params = route.params as NavigationParams;
    setTitleHeader(params.title as string);
    loadActivities(params.type as string)
      .then(() => setLoading(false));
  }, [])

  return (
    <ScrollView style={styles.container}>    
      {/* <SkeletonContent
        containerStyle={{ flex: 1, width: '100%', height: '100%' }}
        animationDirection="horizontalRight"
        isLoading={loading}
        layout={[
          { 
            key: 'banner', 
            width: Dimensions.get('window').width, 
            height: 297, 
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
            flexDirection: 'row',
            marginHorizontal: 20,
            marginBottom: 20,
            children: [
              {
                width: 136,
                height: 182,
                marginRight: 20,
                borderRadius: 10,
              },
              {
                width: 136,
                height: 182,
                marginRight: 20,
                borderRadius: 10,
              },
              {
                width: 136,
                height: 182,
                marginRight: 20,
                borderRadius: 10,
              },
            ]
          },
          {
            key: 'searchBar',
            width: '90%',
            height: 56,
            marginHorizontal: 20,
            marginBottom: 20,
          },
          { 
            key: 'card', 
            width: '90%', 
            height: 120, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 10 
          }
        ]}
      > */}
      <BannerActivity 
        urlImage="https://scania-clube.azurewebsites.net/img/outras-atividades.jpg"
        title={t("Outras atividades")}
        defaultIcon={"puzzle-piece"}
        customIconSize={35}
        showFavorite={false}
        handleLikeActivity={() => handleLikeActivity()}
      />
      <View style={styles.containerCards}>
        <View style={styles.titleAndButton}>
          <Text style={styles.title}>{t("Últimas reservas")}</Text>
        </View>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {
              lastReservations.length > 0 &&  
              lastReservations.map(item => (
                <Card 
                  key={item.id}
                  name={td(item.description, item.description_EN)}
                  urlImage={fileServer + item.image}
                  onPress={() => navigation.navigate('ActivityReserve', 
                    {
                      id: item.id, 
                      title: td(item.description, item.description_EN)
                    }
                  )}
                />
              ))
            }
          </ScrollView>
      </View>

      <View style={styles.contentSearch}>
        <SeachBar 
          placeholder={t("Procurar atividades")}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {           
          activities.length > 0 &&
          activities
          .filter((item) => {
            if(searchText === "")
            {
              return item
            }else if (item.description.toLowerCase().includes(searchText.toLowerCase()))
            {
              return item
            }
          })
          .map(item => (
            <Category
              key={item.id}
              title={td(item.description, item.description_EN)}
              urlImage={fileServer + item.image}
              onPress={() => {
                if(item.needAppointments === false) {
                  navigation.navigate('OtherActivitiesWithoutAppointments', { 
                    id: item.id, 
                    title: td(item.description, item.description_EN),
                    subtitle: td(item.detailActivities?.subtitle as string, item.detailActivities?.subtitle_EN as string),
                    description: td(item.detailActivities?.description as string, item.detailActivities?.description_EN as string)
                  })
                } else {
                  navigation.navigate('ActivityReserve', { 
                    id: item.id, title: td(item.description, item.description_EN) 
                  })
                }
              }}
            />
          ))
        }
      </ScrollView>
      {/* </SkeletonContent> */}
    </ScrollView>
  )
}
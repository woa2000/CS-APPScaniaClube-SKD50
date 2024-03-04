import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// import SkeletonContent from 'react-native-skeleton-content'

import {
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native'

import { Activity, NavigationParams } from '../../interfaces/interfaces'
import * as beautyCenterService from '../../services/beautyCenter'

import { BannerActivity } from '../../components/BannerActivity'
import { Category } from '../../components/Category'
import { SeachBar } from '../../components/SeachBar'
import { useAuth } from '../../contexts/auth'
import { Card } from '../../components/Card'
import { styles } from './styles'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function BeautyCenter() {
  const route = useRoute()
  const navigation = useNavigation()
  const { fileServer, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [activities, setActivities] = useState<Activity[]>({} as Activity[])
  const [lastReservations, setLastReservations] = useState<Activity[]>({} as Activity[])

  const { t, i18n } = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt: string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function handleLikeActivity() {
    return false
  }

  async function loadActivities(type: string) {
    try {
      const response = await beautyCenterService.getBeautyCenterActivitys(user?.id as string, type)
      console.log(response)
      setActivities(response.activities as Activity[])
      setLastReservations(response.lastReservations as Activity[])
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const params = route.params as NavigationParams
    loadActivities(params.type as string)
      .then(() => setLoading(false))
  }, [])

  return (
    <ScrollView>
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
        title={t("Centro Estético")}
        urlImage="https://scania-clube.azurewebsites.net/img/centro-estetico.jpg"
        defaultIcon={"cut"}
        customIconSize={35}
        showFavorite={false}
        handleLikeActivity={() => handleLikeActivity()}
      />
      <View style={styles.container}>
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
                  onPress={() => {
                    if (item.needAppointments === false) {
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
                    }
                    // navigation.navigate('ActivityReserve', 
                    // { 
                    //   id: item.id, 
                    //   title: td(item.description, item.description_EN),
                    // }
                    //  )
                  }
                />
              ))
            }
          </ScrollView>
        </View>

        <View style={styles.contentSearch}>
          <SeachBar
            placeholder={t("Procurar procedimentos")}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {
            activities.length > 0 &&
            activities
              .filter((item) => {
                if (searchText === "") {
                  return item
                } else if (item.description.toLowerCase().includes(searchText.toLowerCase())) {
                  return item
                }
              })
              .map(item => (
                <Category
                  key={item.id}
                  title={td(item.description, item.description_EN)}
                  urlImage={fileServer + item.image}
                  onPress={() => 
                    {
                      if (item.needAppointments === false) {
                          navigation.navigate('OtherActivitiesWithoutAppointments', {
                            id: item.id,
                            title: td(item.description, item.description_EN),
                            subtitle: td(item.detailActivities?.subtitle as string, item.detailActivities?.subtitle_EN as string),
                            description: td(item.detailActivities?.description as string, item.detailActivities?.description_EN as string)
                          })
                        } else {
                          navigation.navigate('SelectProfessional', {
                            id: item.id, title: td(item.description, item.description_EN)
                          })
                        }
                      }
                  //   navigation.navigate('SelectProfessional', {
                  //   id: item.id,
                  //   title: td(item.description, item.description_EN)
                  // })
                  }
                />
              ))
          }
        </ScrollView>
      </View>
      {/* </SkeletonContent> */}
    </ScrollView>
  )
}
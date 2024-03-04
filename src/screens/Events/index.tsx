import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// import SkeletonContent from 'react-native-skeleton-content'

import { 
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native'

import { Event, EventProps } from '../../interfaces/interfaces'
import { BannerActivity } from '../../components/BannerActivity'
import * as eventService from '../../services/events'
import { Category } from '../../components/Category'
import { SeachBar } from '../../components/SeachBar'
import { useAuth } from '../../contexts/auth'
import { Card } from '../../components/Card'
import { styles } from './styles'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function Events() {
  const route = useRoute()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const { fileServer, user } = useAuth();
  const [events, setEvents] = useState<Event[]>([] as Event[])
  const [lastEvents, setLastEvents] = useState<Event[]>([] as Event[])

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function handleLikeActivity() {
    return false
  }

  async function loadEvents(userId: string) {
    setLoading(true)
    const response = await eventService.getActiveEvents()
    const eventsByUserId = await eventService.getEventsByUserId(userId)
    setEvents(response as Event[])
    setLastEvents(eventsByUserId as Event[])
    setLoading(false)
  }

  useEffect(() => {
    loadEvents(user?.id as string)
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
        urlImage="https://images.unsplash.com/photo-1440186347098-386b7459ad6b"
        title={t("Eventos")}
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
              lastEvents.length > 0 &&  
              lastEvents.map(item => (
                <Card 
                  key={item.id}
                  name={td(item.title, item.title_EN)}
                  urlImage={fileServer + item.image}
                  onPress={() => navigation.navigate('EventDetail', 
                    {
                      id: item.id, 
                      title: td(item.title, item.title_EN),
                    }
                  )}
                />
              ))
            }
          </ScrollView>
      </View>

      <View style={styles.contentSearch}>
        <SeachBar 
          placeholder={t("Procurar eventos")}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {           
          events.length > 0 &&
          events
          .filter((item) => {
            if(searchText === "")
            {
              return item
            }else if (item.title.toLowerCase().includes(searchText.toLowerCase()))
            {
              return item
            }
          })
          .map(item => (
            <Category
              key={item.id}
              title={td(item.title, item.title_EN)}
              urlImage={fileServer + item.image}
              onPress={() => navigation.navigate('EventDetail', {
                id: item.id, 
                title: td(item.title, item.title_EN)
              })}
            />
          ))
        }
      </ScrollView>
      {/* </SkeletonContent> */}
    </ScrollView>
  )
}
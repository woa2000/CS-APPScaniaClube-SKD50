import React, { useState, useEffect } from 'react'
// import SkeletonContent from 'react-native-skeleton-content'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions,
  Linking 
} from 'react-native'

import { Banner, Event, LikedActivity } from '../../interfaces/interfaces'
import { BannerPromotion } from '../../components/BannerPromotion'
import { Category } from '../../components/Category'
import * as homeService from '../../services/home'
import * as eventService from '../../services/events'
import { useAuth } from '../../contexts/auth'
import { Card } from '../../components/Card'
import data from '../../../data.json'
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function Home() {
  const navigation = useNavigation();
  const { user, fileServer } = useAuth();
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState<Banner[]>({} as Banner[]);
  const [likedActivities, setLikedActivities] = useState<LikedActivity[]>({} as LikedActivity[]);
  const [events, setEvents] = useState<Event[]>([] as Event[]);

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };

  const supportedURL = 'https://forms.office.com/pages/responsepage.aspx?id=5GLAO52sF0y03TqtY3_xrJpm7yFIdb1IlQd6R2c_EQ5UMEIwQlhCUE9aQzVWSVA0QjVJOUFBVkVEMy4u';


  async function loadHome(){
    try {
      const response = await homeService.getHome(user?.id as string);
      const event = await eventService.getLastEvents();
      setBanners(response.banners as Banner[]);
      setLikedActivities(response.likedActivities as LikedActivity[]);
      setEvents(event as Event[]);

    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadHome()
    .then(
      () => setLoading(false)
    )
  }, [])

  return (
    <ScrollView style={styles.container}>
      <StatusBar 
        style="dark"
        backgroundColor="#FFF"
      />
      
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
            key: 'card', 
            width: '90%', 
            height: 120, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 10 
          }
        ]}
      > */}
        <ScrollView
          horizontal
          pagingEnabled
        >
          {
            banners?.length > 0  && 
            banners.map(item => (
              <BannerPromotion
                key={item.id}
                title={td(item.title, item.title_EN)}
                subtitle={td(item.caption, item.caption_EN)}
                urlImage={fileServer +  item.mobileImageUrl}
                activeOpacity={0.7}
                onPress={() => {}}
              />
            ))
          }
        </ScrollView>

        <View style={styles.containerCards}>
          <View style={styles.titleAndButton}>
            <Text style={styles.title}>{t("Populares para você")}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Activitys', { title: 'Atividades' })}>
              <Text style={styles.buttonText}>{t("Todas as atividades")}</Text>
              <Feather name="chevron-right" size={15} color="#6E8CA0ff" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {
              likedActivities.length > 0 && likedActivities.map(item => (
                <Card 
                  key={item.id}
                  name={td(item.description, item.description_EN)}
                  urlImage={fileServer +  item.image}
                  onPress={() => navigation.navigate('ActivityReserve', 
                    { id: item.id, title: item.description  })
                  }
                />
              ))
            }
          </ScrollView>
        </View>
      
        <View style={styles.sectionCategory}>
          <Category
            urlImage={'https://scania-clube.azurewebsites.net/img/atividades.jpg'}
            title={t('Atividades')}
            onPress={() => navigation.navigate('Activitys', 
              { type: '1', title: t('Atividades') })
            }
          />
          <Category
            urlImage={'https://scania-clube.azurewebsites.net/img/centro-estetico.jpg'}
            title={t('Centro Estético')}
            onPress={() => navigation.navigate('BeautyCenter', 
              { type: '3', title: t('Centro Estético')})
            }
          />
          <Category
            urlImage={'https://scania-clube.azurewebsites.net/img/lanchonete.jpg'}
            title={t('Lanchonete')}
            onPress={() => navigation.navigate('SnackBar')}
          />
          <Category
            urlImage={'https://scania-clube.azurewebsites.net/img/quadras.jpg'}
            title={t('Quadras')}
            onPress={() => navigation.navigate('Squares', 
              { type: '2', title: 'Quadras' })
            }
          />
          {/* <Category
            urlImage={'https://scania-clube.azurewebsites.net/img/quiosques.jpg'}
            title={t('Quiosques')}
            onPress={() => navigation.navigate('Kiosks', 
              { type: '4', title: 'Quiosques' })
            }
          /> */}
          <Category
            urlImage={'https://scania-clube.azurewebsites.net/img/quiosques.jpg'}
            title={t('Quiosques')}
            onPress={() => Linking.openURL(supportedURL)}
          />

          <Category
            urlImage={'https://scania-clube.azurewebsites.net/img/outras-atividades.jpg'}
            title={t('Outras atividades')}
            onPress={() => navigation.navigate('OtherActivitys', 
              { type: '5', title: t('Outras atividades') })
            }
          />
        </View>

        <View style={[styles.containerCards, { marginBottom: 70}]}>
          <View style={styles.titleAndButton}>
            <Text style={styles.title}>{t('Últimos eventos')}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Events', { type: '1', title: t('Eventos') })}>
              <Text style={styles.buttonText}>{t("Todos eventos")}</Text>
              <Feather name="chevron-right" size={15} color="#6E8CA0ff" />
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {
              events.map(item => (
                <Card 
                  key={item.id}
                  name={td(item.title, item.title_EN)}
                  urlImage={fileServer + item.image}
                  onPress={() => navigation.navigate('EventDetail', {
                    id: item.id, 
                    title: td(item.title, item.title_EN)
                  })}
                />
              ))
            }
          </ScrollView>
        </View>
        
      {/* </SkeletonContent>  */}
    </ScrollView>
  )
}

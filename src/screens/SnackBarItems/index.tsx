import React, { useEffect, useState } from 'react'
// import SkeletonContent from 'react-native-skeleton-content'
import { useNavigation } from '@react-navigation/native'

import { 
  View,
  ScrollView,
  Dimensions,
} from 'react-native'

import { BannerActivity } from '../../components/BannerActivity'
import { SeachBar } from '../../components/SeachBar'
import { DishCard } from '../../components/DishCard'

import { SnackBarItemsProps } from '../../interfaces/interfaces'
import * as snackBarService from '../../services/snackBar'
import { useAuth } from '../../contexts/auth'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


import { 
  Category, 
  Title, 
  styles 
} from './styles'

export function SnackBarItems() {
  const navigation = useNavigation()
  const { fileServer } = useAuth()
  const [snacks, setSnacks] = useState<SnackBarItemsProps[]>({} as SnackBarItemsProps[])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function handleLikeActivity() {
    return false
  }

  async function loadActiveDishes() {
    try {
      const response = await snackBarService.getActiveDishesGroup();
      setSnacks(response as SnackBarItemsProps[])
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {

    loadActiveDishes().then(() => setLoading(false))
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
        urlImage="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
        defaultIcon={"coffee"}
        customIconSize={35}
        title={t("Lanchonete")}
        showFavorite={false}
        handleLikeActivity={() => handleLikeActivity()}
      />
      
      <View style={styles.contentSearch}>
        <SeachBar 
          placeholder={t("Procurar")}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      
      <View>
      {
        snacks.length > 0 &&
        snacks.map((item, index) => (
          <View key={index}>
            <Category>
              <Title>
                {td(item.category, item.category_EN)}
              </Title>
            </Category>
            {
              item.itens.map((item) => (
                <DishCard
                  key={item.id}
                  image={fileServer + item.image}
                  titleCard={td(item.title, item.title_EN)}
                  price={`R$ ${item.value}`.slice(0, -3)}
                  onPress={() => navigation.navigate('Snack', { 
                    id: item.id, 
                    value: item.value 
                  })}
                />
              ))
            }
          </View>
        ))
      }
      </View>
      {/* </SkeletonContent> */}
    </ScrollView>
  )
}
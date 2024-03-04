import React, { useEffect, useState } from 'react'
// import SkeletonContent from 'react-native-skeleton-content'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { Dimensions } from 'react-native'

import { ItemListContact } from '../../components/ItemListContact'
import { BannerPromotion } from '../../components/BannerPromotion'
import { ItemListHours } from '../../components/ItemListHours'
import { Card } from '../../components/Card'

import * as snackBarService from '../../services/snackBar'
import { useAuth } from '../../contexts/auth'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


import { 
  Container,
  CardsContainer,
  Header,
  Label,
  ButtonAllItems,
  ButtonText,
  Cards,
  ContainerHours,
  Content,
} from './styles'

import { 
  DishOfDayProps, 
  SnackBarProps, 
  SnackFavoriteProps 
} from '../../interfaces/interfaces'



export function SnackBar() {
  const navigation = useNavigation()
  const { user, fileServer } = useAuth()
  const [loading, setLoading] = useState(true)
  const [snackBar, setSnackBar] = useState<SnackBarProps>({} as SnackBarProps)
  const [dishOfDay, setDishOfDay] = useState<DishOfDayProps>({} as DishOfDayProps)
  const [favorites, setFavorites] = useState<SnackFavoriteProps[]>([] as SnackFavoriteProps[])

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function loadSnackBar(userId: string) {
    const snackBar = await snackBarService.getCafeteria()
    const dishsOfDay = await snackBarService.getDishOfDay()
    const dishFavorite = await snackBarService.getUserFavoriteDishes(userId)
    setDishOfDay(dishsOfDay as DishOfDayProps)
    setSnackBar(snackBar as SnackBarProps)
    setFavorites(dishFavorite as SnackFavoriteProps[])
  }
  
  useEffect(() => {
    setLoading(true)
    loadSnackBar(user?.id as string)
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
            key: 'subtitle', 
            width: 180, 
            height: 20,
            marginHorizontal: 20, 
            marginBottom: 20 
          },
          { 
            key: 'card', 
            width: '90%', 
            height: 190, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 10 
          }
        ]}
      > */}
        {
          dishOfDay ? (
            <BannerPromotion 
              title={td(dishOfDay.title, dishOfDay.title_EN)}
              urlImage={fileServer + dishOfDay.image}
              defaultIcon={"coffee"}
              customIconSize={45}
              subtitle={td(dishOfDay.subtitle, dishOfDay.subtitle_EN)}
              activeOpacity={0.7}
              showButtonBack={true}
              onPress={() => navigation.navigate('Snack', { id: dishOfDay.id })}
            />
          ) :
          (
            <BannerPromotion 
              title={snackBar.name}
              urlImage={fileServer + snackBar.image}
              defaultIcon={"coffee"}
              customIconSize={45}
              subtitle={t('Lanchonete')}
              activeOpacity={0.7}
              showButtonBack={true}
              onPress={() => {}}
            />
          )
        }

        <CardsContainer>
          <Header>
            <Label>{t("Populares para você")}</Label>
            <ButtonAllItems
              onPress={() => navigation.navigate('SnackBarItems')}
            >
              <ButtonText>{t("Todos os itens")}</ButtonText>
              <Feather 
                name="chevron-right" 
                size={15} 
                color="#6E8CA0ff" 
              />
            </ButtonAllItems>
          </Header>
          <Cards>
            {
              favorites.map(item => (
                <Card 
                  key={item.id}
                  name={td(item.title, item.title_EN)}
                  urlImage={fileServer + item.image}
                  onPress={() => navigation.navigate('Snack', { id: item.id })}
                />
              ))
            }
          </Cards>
        </CardsContainer>

        <ContainerHours>
          <Header>
            <Label>{t("Horários e Contatos")}</Label>
          </Header>
          <Content>
            {
              snackBar.openingHours?.map((item, index) => (
                <ItemListHours
                  key={index}
                  date={item.description}
                  hour={item.labelTime}
                />
              ))
            }
            {
              snackBar.contacts?.map((item, index) => (
                <ItemListContact
                  key={index}
                  contact={item}
                />
              ))
            }
          </Content>
        </ContainerHours>
      {/* </SkeletonContent> */}
    </Container>
  )
}
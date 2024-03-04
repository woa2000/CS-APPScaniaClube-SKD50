import React, { useEffect, useState } from 'react'
import { BannerPromotion } from '../../components/BannerPromotion'
import { ButtonStandard } from '../../components/ButtonStandard'

import { 
  Container,
  Content,
  ContainerInfo,
  Title,
  Description,
  Price,
} from './styles'

import * as snackBarService from '../../services/snackBar'
import { DishOfDayProps, SnackBarItem } from '../../interfaces/interfaces'
import { useNavigation, useRoute } from '@react-navigation/native'
// import SkeletonContent from 'react-native-skeleton-content'
import { Dimensions } from 'react-native'
import { useAuth } from '../../contexts/auth'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


export function Snack() {
  const route = useRoute()
  const navigation = useNavigation()
  const { fileServer } = useAuth()
  const params = route.params as DishOfDayProps
  const [snack, setSnack] = useState<SnackBarItem>({} as SnackBarItem)
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState('')

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function loadPrice(value: number) {
    var price = (value).toFixed(2).replace('.', ',')
    
    return setPrice(price)
  }

  async function loadSnack(id: string) {
    const response = await snackBarService.getDish(id)
    setSnack(response as SnackBarItem)

    loadPrice(response.value)
  }

  useEffect(() => {
    loadSnack(params.id as string)
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
            marginBottom: 40 
          },
          { 
            key: 'text 1', 
            width: '90%', 
            height: 20,
            marginHorizontal: 20, 
            marginBottom: 8 
          },
          { 
            key: 'text 2', 
            width: '90%', 
            height: 20,
            marginHorizontal: 20, 
            marginBottom: 8
          },
          { 
            key: 'text 3', 
            width: '90%', 
            height: 20,
            marginHorizontal: 20, 
            marginBottom: 60 
          },
          { 
            key: 'button', 
            width: '90%', 
            height: 60, 
            marginHorizontal: 20, 
            marginBottom: 20, 
            borderRadius: 40 
          }
        ]}
      > */}
        <Content key={snack.id}>
          <BannerPromotion
            urlImage={fileServer + snack.image}
            defaultIcon={"cutlery"}
            customIconSize={45}
            title={td(snack.title, snack.title_EN)}
            subtitle={td(snack.subtitle, snack.subtitle_EN)}
            activeOpacity={1}
            showButtonBack={true}
          />
          <ContainerInfo>
            <Title>
              {t("Informações")}
            </Title>
            <Description>
              {snack.description}
            </Description>

            <Price>
              R$ {price}
            </Price>

            <ButtonStandard
              title={t("Voltar")}
              onPress={() => navigation.goBack()}
            />
          </ContainerInfo>
        </Content>
      {/* </SkeletonContent> */}
    </Container>
  )
}
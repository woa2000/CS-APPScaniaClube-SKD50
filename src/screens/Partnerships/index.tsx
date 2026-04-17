import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
  Linking,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'

import {
  NavigationParams,
  Partnership,
  PartnershipType,
} from '../../interfaces/interfaces'
import { BannerActivity } from '../../components/BannerActivity'
import * as partnershipService from '../../services/partnership'
import { Category } from '../../components/Category'
import { SeachBar } from '../../components/SeachBar'
import { useAuth } from '../../contexts/auth'
import { useQuery } from '@tanstack/react-query'
import { trackError } from '../../services/telemetry'

import { useTranslation } from 'react-i18next'
import { useTrasnlactionDynamic } from '../../languages/translateDB'

export function Partnerships() {
  const route = useRoute()
  const navigation = useNavigation<any>()
  const [searchText, setSearchText] = useState('')
  const { fileServer, setTitleHeader, user } = useAuth()
  const params = route.params as NavigationParams

  const { t, i18n } = useTranslation()
  const tDynamic = useTrasnlactionDynamic
  const td = (pt: string, en: string) => {
    const lang = i18n.language
    return tDynamic(pt, en, lang)
  }

  const partnershipTypesQuery = useQuery({
    queryKey: ['partnership-types'],
    queryFn: partnershipService.getAllTypes,
    enabled: Boolean(user?.id),
    staleTime: 10 * 60 * 1000,
  })

  const selectedTypeId = useMemo(() => {
    const routeType = params?.type

    if (!routeType) {
      return undefined
    }

    if (partnershipService.isPartnershipTypeUuid(routeType)) {
      return routeType
    }

    return undefined
  }, [params?.type, partnershipTypesQuery.data])

  const partnershipsPageQuery = useQuery({
    queryKey: ['partnerships-page', user?.id, params?.type, selectedTypeId],
    queryFn: () =>
      partnershipService.getAllPartnerships(selectedTypeId),
    enabled: Boolean(user?.id),
    staleTime: 2 * 60 * 1000,
  })

  async function handleLikePartnership() {
    return false
  }

  async function handleOpenPartnership(partnership: Partnership) {
    // if (partnership.url) {
    //   try {
    //     await Linking.openURL(partnership.url)
    //     return
    //   } catch (error) {
    //     trackError('partnership_open_url_error', {
    //       message: String(error),
    //       partnershipId: partnership.id,
    //       url: partnership.url,
    //     })
    //   }
    // }

    navigation.navigate('OtherActivitiesWithoutAppointments', {
      id: partnership.id,
      type: 'partnership',
      title: partnership.nome,
      description: partnership.description,
      description_EN: partnership.description_EN,
      subtitle: partnership.tipo?.description,
      subtitle_EN: partnership.tipo?.description_EN,
      image: partnership.image,
    })
  }

  useEffect(() => {
    setTitleHeader(params.title as string)
  }, [params.title, setTitleHeader])

  useEffect(() => {
    if (partnershipsPageQuery.error) {
      trackError('partnerships_page_query_error', {
        message: String(partnershipsPageQuery.error),
        type: params?.type,
      })
    }
  }, [partnershipsPageQuery.error, params?.type])

  useEffect(() => {
    if (partnershipTypesQuery.error) {
      trackError('partnerships_types_query_error', {
        message: String(partnershipTypesQuery.error),
      })
    }
  }, [partnershipTypesQuery.error])

  const partnerships = (partnershipsPageQuery.data as Partnership[] | undefined) ?? []

  return (
    <ScrollView style={styles.container}>
      <BannerActivity
        urlImage="https://scania-clube.azurewebsites.net/img/Parcerias.png"
        title={t('Parcerias')}
        showFavorite={false}
        handleLikeActivity={() => handleLikePartnership()}
      />      
      <View style={styles.contentSearch}>
        <SeachBar
          placeholder={t('Procurar parcerias')}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {partnerships.length > 0 &&
          partnerships
            .filter((partnership) => {
              if (searchText === '') {
                return true
              }

              const search = searchText.toLowerCase()

              return (
                partnership.nome?.toLowerCase().includes(search) ||
                partnership.description?.toLowerCase().includes(search)
              )
            })
            .map((partnership) => (
              <Category
                key={partnership.id}
                title={partnership.nome}
                urlImage={partnership.image ? fileServer + partnership.image : undefined}
                onPress={() => handleOpenPartnership(partnership)}
              />
            ))}
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  contentSearch: {
    marginTop: 20,
    marginBottom: 20,
  },
})

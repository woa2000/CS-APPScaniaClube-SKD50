import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import { ButtonStandard } from '../../components/ButtonStandard'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


import {
  Container,
  ButtonContainer,
} from './styles'

interface PaymentProps {
  linkPayment: string
}

export function Payment() {
  const route = useRoute()
  const navigation = useNavigation()
  const params = route.params as PaymentProps

  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  return (
    <Container>
      <WebView
        style={{ 
          flex: 1, 
          width: Dimensions.get('window').width, 
          height: Dimensions.get('window').height 
        }}
        source={{ uri: params.linkPayment }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator></ActivityIndicator>}
      />
        <ButtonContainer>
          <ButtonStandard
            onPress={() => navigation.navigate('Events')}
            title={t("Voltar")}
          />
        </ButtonContainer>
    </Container>
  )
}
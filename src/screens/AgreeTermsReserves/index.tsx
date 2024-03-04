import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import WebView from 'react-native-webview';
import { ButtonStandard } from '../../components/ButtonStandard';
import { theme } from '../../global/styles/theme';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as activityService from '../../services/activity';
import api from '../../services/api';

import { OperatingRule } from '../../interfaces/interfaces';

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


import {
  Container,
  Body,
  Footer,
  CheckBox,
  Label,
  Item,
	ErrorMessage,
} from './styles';

interface Props {
  userId: string;
  activityId: string;
}

interface SubmitProps {
  checkBox: boolean;
}

export function AgreeTermsReserves() {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as Props;
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  const schema = Yup.object().shape({
    checkBox: Yup.boolean()
      .oneOf([true], t('Você precisa aceitar os termos de uso para continuar o agendamento.'))
      .required(t('Você deve aceitar os termos de uso para continuar o agendamento.'))
  });
  
  const { handleChange, handleSubmit, values, errors } = useFormik<SubmitProps>({
    initialValues: {
      checkBox: false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      if (values.checkBox) {
        await activityService.acceptedOperationRule(params.userId, params.activityId)
          .then(response => {
            navigation.navigate('ActivityReserve')
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  });

  async function loadAgreeTerms(idUser: string, activityId: string) {
    await api.get(`/Activitys/GetOperatingRule?ActivityId=${activityId}&UserId=${idUser}`)
      .then(response => {
        let rule = response.data as OperatingRule;
        setTerm(td(rule.text, rule.text_EN) as any);
      })
      .catch(error => {
        console.log(error);
      });
      console.log(term)
  }

  useEffect(() => {
    loadAgreeTerms(params.userId as string, params.activityId)

  }, [])

  return (
    <Container>
      <Body>
        <WebView
          source={{ html: term }}
          style={{ flex: 1, height: '80%', width: '100%' }}
        />
      </Body>
      <Footer>
        <Item>
          <CheckBox>
            <BouncyCheckbox
              size={25}
              fillColor={theme.colors.primaryBlue}
              unfillColor={theme.colors.typographySnow}
              iconStyle={{ color: theme.colors.typographySnow }}
              onPress={() => {
                values.checkBox = !values.checkBox;
                handleChange('checkBox');
              }}
            />
            <Label>
              {t("Li e concordo com os termos e condições de uso.")}
            </Label>
          </CheckBox>
          {
            errors.checkBox && 
            <ErrorMessage style={{ color: 'red' }}>
                {errors.checkBox}
              </ErrorMessage>
          }
        </Item>

        <ButtonStandard
          title={t("Aceitar")}
          loading={loading}
          onPress={() => handleSubmit()}
        />

        <ButtonStandard
          title={t("Cancelar")}
          onPress={() => navigation.navigate('ActivityReserve')}
        />  
      </Footer>
    </Container>
  );
}
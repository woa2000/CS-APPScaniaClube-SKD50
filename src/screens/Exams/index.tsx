import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { ButtonStandard } from '../../components/ButtonStandard';
import { ExamCard } from '../../components/ExamCard';
import { SeachBar } from '../../components/SeachBar';

import * as examService from '../../services/exams';

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


import {
  Container,
  SearchBarContainer,
  Content,
  ExamsView
} from './styles';

import { ExamsProps } from '../../interfaces/interfaces';

export function Exams() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<ExamsProps[]>([] as ExamsProps[]);

  const { t, i18n } = useTranslation();

  async function loadExams() {
    await examService.getMedicalExam()
      .then(response => {
        const exams = response.map((exam: ExamsProps) => {
          const sendDate = moment(exam.sendDate).format('DD/MM/YYYY');
          const expirationDate = exam.expirationDate === null ? 
          t('Não definido') : moment(exam.expirationDate).format('DD/MM/YYYY');

          return {
            id: exam.id,
            authorization: exam.authorization,
            activity: exam.activity,
            sendDate: sendDate,
            expirationDate: expirationDate,
            image: exam.image,
          }
        });

        setData(exams as ExamsProps[]);
      })
      .catch(error => {
        console.error(error);
      })
  }
  
  function handleAddAttachment() {
    navigation.navigate('ExamAddAttachment');
  }

  useFocusEffect(useCallback(() => {
    loadExams();
  },[]));

  return (
    <Container>
      <SearchBarContainer>
        <SeachBar 
          value={searchText}
          onChangeText={setSearchText}
          placeholder={t('Procurar atividades')}
        />
      </SearchBarContainer>

      <Content>
        <ExamsView>
          {
            data.length > 0 &&
            data
            .filter(exam => {
              if(searchText === "")
              {
                return exam
              }else if (exam.activity.toLowerCase().includes(searchText.toLowerCase()))
              {
                return exam
              }
            })
            .map(exam => (
              <ExamCard
                key={exam.id} 
                type={exam.authorization === 0 ? 'waiting' : 
                  exam.authorization === 1 ? 'authorized' : 'refused'}
                status={exam.authorization === 0 ? t('Aguardando') : 
                  exam.authorization === 1 ? t('Autorizado') : t('Recusado')}
                title={exam.activity}
                validate={exam.expirationDate}
                sendDate={exam.sendDate}
                onPress={() => navigation.navigate('ExamDetail', { image: exam.image })}
              />
            ))
          }
        </ExamsView>

        <ButtonStandard
          title={t("Anexar Exame")}
          onPress={handleAddAttachment}
        />
      </Content>
    </Container>
  )
}
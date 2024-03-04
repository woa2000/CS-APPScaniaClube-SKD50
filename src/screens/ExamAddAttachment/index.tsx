import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Modal, Image, ActivityIndicator } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { SelectButton } from '../../components/SelectButton';
import { ExamActivitySelect } from '../ExamActivitySelect';

import {
  Container,
  Attachment,
  PickImageButton,
  TitleButton,
  ImageContainer,
  Placeholder,
  PlaceholderTitle
} from './styles';

import { ButtonStandard } from '../../components/ButtonStandard';
import { useAuth } from '../../contexts/auth';
import { theme } from '../../global/styles/theme';
import api from '../../services/api';

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


interface ImageProps {
  type: string;
  name: string;
  uri: string;
}

export function ExamAddAttachment() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [image, setImage] = useState('');

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  const [activity, setActivity] = useState({
    id: '',
    description: t('Selecione'),
  })

  function handleOpenActivityModal() {
    setActivityModalOpen(true);
  }

  function handleCloseActivityModal() {
    setActivityModalOpen(false);
  }

  async function handleSelectImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
      doNotSave: true,
      allowsEditing: false,
    })

    if (result.cancelled) {
      return;
    }
    
    const { uri: image } = result;
 
    setImage(image);
    
    if (status !== 'granted') {
      Alert.alert('', t('Para selecionar uma imagem você precisa conceder permissão.'));
      return;
    }
  }
  

  async function handleSubmit() {
    if(activity.id === '') {
      Alert.alert('', t('Selecione uma atividade'));
      return;
    }

    if(image === '') {
      Alert.alert('', t('Selecione uma imagem'));
      return;
    }

    const imageSelected = {
      name: image.split('/').pop(),
      uri: image,
      type: 'image/jpeg',
    } as any;

    const data = new FormData();

    data.append('UserId', user?.id as string);
    data.append('ActivitId', activity.id);
    data.append('MedicalExam', imageSelected);
   
    try {
      await api.post(`/Activitys/AddMedicalExam`, data)
        .then((response) => {
          Alert.alert('', t('Anexo adicionado com sucesso'));
          navigation.navigate('Exams');
        })
        .catch(() => {
          Alert.alert('', t('Erro ao adicionar anexo'));
          return
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <SelectButton 
        title={activity.description}
        onPress={handleOpenActivityModal}
      />
      
      <ImageContainer>
        {
          image === '' ? (
            <Placeholder>
              <PlaceholderTitle>
                {t("Nenhuma foto")}{'\n'} {t("carregada")}
              </PlaceholderTitle>
            </Placeholder>
          ) : (
            image && (
              <Image 
                source={{ uri: image }}
                style={{ 
                  width: '100%', 
                  height: '100%',
                }} 
              />
            )
          )
        }
      </ImageContainer>

      <Attachment>
        <PickImageButton
          onPress={handleSelectImage}
        >
          <TitleButton>
            {t("Carregar Exame")}
          </TitleButton>
        </PickImageButton>

        <ButtonStandard
          title={t("Salvar")}
          onPress={handleSubmit}
        />
      </Attachment>


      <Modal
        visible={activityModalOpen}
        statusBarTranslucent
      >
        <ExamActivitySelect 
          activity={activity}
          setActivity={setActivity}
          closeSelectActivity={handleCloseActivityModal}
        />
      </Modal>
    </Container>
  )
}
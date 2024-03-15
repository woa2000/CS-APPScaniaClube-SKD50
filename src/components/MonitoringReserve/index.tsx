import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Modal from "react-native-modal"
import { Input } from '../../components/Input'
import { ButtonStandard } from '../ButtonStandard'
import { ButtonLogin } from '../ButtonLogin'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';

import { MonitoringChieldren} from '../../interfaces/interfaces'

import { styles, Form, Label } from './styles'

type Props = TouchableOpacityProps & {
  title?: string | undefined
  message?: string | undefined
  showButtonCancel?: boolean
  lstChildren?: MonitoringChieldren[]
  onConfirm?: () => void
  onCancel?: () => void
  addChildren?: ({name, age}) => void
  saveMonitoring?: () => void
  visible: boolean
}

export function MonitoringReserve({ 
  visible, 
  title, 
  message, 
  onConfirm,
  onCancel,
  addChildren,
  showButtonCancel = false, 
  lstChildren = [],
  ...rest 
}: Props) {

  // const lstChieldren =  [] as MonitoringChieldren[];
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  const ChildrenDetail = ({item}) => {
    return (
      <View key={item.id} style={styles.row}>
        <Text style={styles.infoName}>{item.name}</Text>
        <Text style={styles.infoAge}>{item.age}</Text>
      </View>
    );
  };

  async function handleCancel() {
    onCancel;
  }

  async function handleConfirm() {    
    onConfirm;
  }

  async function  resetForm() {
    setName('');
    setAge('');
  }

  // async function addChieldren (name: string, age: string) {
  //   const newItem = { id: lstChieldren.length + 1, name: name, age: age };
  //   console.log(newItem);    
  //   setStLstChieldren([...stLstChieldren, newItem]);
  //   console.log(stLstChieldren);
  // }

  return (
    <View>
      <Modal 
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={visible}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>          
          <Form>
            <View style={styles.contentForm}>
              <View style={styles.row}>
                <View style={styles.contentName}>
                  <Label>{t("Nome")}</Label>
                  <Input
                    editable={true}
                    onChangeText={setName}
                    value={name}
                    style={styles.input}
                  />
                </View>
                <View style={styles.contentAge}>
                  <Label>{t("Idade")}</Label>
                  <Input 
                    editable={true}
                    onChangeText={setAge}
                    value={age}
                    style={styles.input}
                  />
                </View>                
              </View>
              <View style={styles.row}>
                <View style={styles.contentButton}>
                    <ButtonLogin
                      style={styles.buttonAdd}
                      title={t('Adicionar')}
                      onPress={() => {
                          addChildren({name, age});
                          resetForm();
                        }                        
                      }
                    />
                </View>  
              </View>
              <View style={styles.row}>
                <View style={styles.contentInfoChieldren}> 
                  {
                    lstChildren.length > 0 ?
                    lstChildren.map(children => (
                      <ChildrenDetail key={children.id} item={children} />
                    )):
                    (
                      <View><Text></Text></View>
                    )
                  } 
                  </View>
              </View>
            </View>            
          </Form>  
         
          { showButtonCancel ? (
            <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
                <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
            ) : (
              <View />
            )
          }
          
          <TouchableOpacity 
            {...rest}
            onPress={onConfirm}
            style={styles.button}
          >
            <Feather name="check" size={24} color='#fff'/>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

import React, { useState } from 'react'
import {  TouchableOpacityProps, View } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { theme } from '../../global/styles/theme'
import { 
  Container,
  CheckBox,
  Description,
  Title,
  Text,
} from './styles'

interface Props extends TouchableOpacityProps{
  text: string,
  section: string,
  visibleCheckBox: boolean,
  toggleCheckbox?: () => void | undefined,
}

export function ItemListTraining({ text, section, toggleCheckbox, visibleCheckBox, ...rest }: Props) {

  return (
    <Container {...rest}>
      <CheckBox>
        { visibleCheckBox ? (
            <BouncyCheckbox
              size={28}
              fillColor='#CEC0D8'
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: '#CEC0D8'}}
              textStyle={{ fontFamily: theme.fonts.roboto300, color: '#4C5264' }}
              onPress={() => toggleCheckbox}
            />
          ) : (
            <View />
          )
        }
        
        <Title>
          {text}
        </Title>
      </CheckBox>

        <Description>
          <Text>{section}</Text>
        </Description>
    </Container>
  )
}
                
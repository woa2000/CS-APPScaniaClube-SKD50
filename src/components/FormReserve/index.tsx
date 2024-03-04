import { Moment } from 'moment-timezone'
import React from 'react'
import { Input } from '../Input'
import { InputDate } from '../InputDate'

import { 
  Container, 
  FormTitle,
  Label, 
} from './styles'

interface Props {
  type: number
  title?: string
  name?: string
  RG?: string
  phone?: string
  birthDate?: string
  shownRGField?: boolean
  shownPhoneField?: boolean
  shownBirthDateField?: boolean
  requiredRg?: boolean
  requiredBirthDate?: boolean
  requiredCellphone?: boolean
  onChangeName?: (value: string) => void
  onChangeRG?: (value: string) => void
  onChangePhone?: (value: string) => void
  onChangeBirthDate?: (value: string) => void
}

export function FormReserve({ 
  type,
  title,
  name,
  RG,
  birthDate,
  phone,
  onChangeName,
  onChangeRG,
  onChangeBirthDate,
  onChangePhone,
  shownRGField,
  shownPhoneField,
  shownBirthDateField,
  requiredRg,
  requiredBirthDate,
  requiredCellphone
}: Props) {
  
  return (
    <Container type={type}>
      <FormTitle>
        { title }
      </FormTitle>
      
      <Label>Nome (Obrigatório)</Label>
      <Input 
        value={name}
        onChangeText={onChangeName}
        autoCapitalize='words'
      />

      {
        shownRGField ? (
          <>
            <Label>Documento {requiredRg ? '(Obrigatório)' : ''}</Label>
            <Input 
              value={RG}
              onChangeText={onChangeRG}
              keyboardType='numeric'
              maxLength={14}
            />
          </>
        ) : null
      }

      {
        shownPhoneField ? (
          <>
            <Label>Celular {requiredCellphone ? '(Obrigatório)' : ''}</Label>
            <Input 
              value={phone}
              onChangeText={onChangePhone}
              keyboardType='numeric'
              maxLength={14}
            />
          </>
        ) : null
      }

      {
        shownBirthDateField ? (
          <>
            <Label>Data de Nascimento {requiredBirthDate ? '(Obrigatória)' : ''}</Label>
            <InputDate
              type={'datetime'}
              options={{
                format: 'DD-MM-YYYY',
              }}
              placeholder={'DD-MM-YYYY'}
              value={birthDate}
              onChangeText={onChangeBirthDate}
            />
          </>
        ) : null
      }
      
    </Container>
  )
}
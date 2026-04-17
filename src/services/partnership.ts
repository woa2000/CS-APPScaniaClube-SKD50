import { Alert } from 'react-native'
import { t } from 'i18next'

import api from '../services/api'
import { Partnership, PartnershipType } from '../interfaces/interfaces'

type RawRecord = Record<string, unknown>

function isRawRecord(value: unknown): value is RawRecord {
  return typeof value === 'object' && value !== null
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  )
}

function toRawArray(payload: unknown): RawRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRawRecord)
  }

  if (!isRawRecord(payload)) {
    return []
  }

  const candidateKeys = [
    'partnerships',
    'activities',
    'data',
    'value',
    'items',
    'result',
  ]

  for (const key of candidateKeys) {
    const value = payload[key]
    if (Array.isArray(value)) {
      return value.filter(isRawRecord)
    }
  }

  return []
}

function toPartnership(raw: RawRecord): Partnership {
  const tipoRaw = isRawRecord(raw.tipo) ? raw.tipo : undefined

  return {
    id: String(raw.id ?? ''),
    ativo: Boolean(raw.ativo ?? raw.active ?? false),
    nome: String(raw.nome ?? raw.name ?? '').trim(),
    documento: String(raw.documento ?? raw.document ?? '').trim(),
    tipoPessoa: String(raw.tipoPessoa ?? '').trim(),
    telefone: String(raw.telefone ?? raw.phone ?? '').trim(),
    email: String(raw.email ?? '').trim(),
    cep: String(raw.cep ?? '').trim(),
    endereco: String(raw.endereco ?? raw.address ?? '').trim(),
    numero: String(raw.numero ?? '').trim(),
    uf: String(raw.uf ?? '').trim(),
    cidade: String(raw.cidade ?? raw.city ?? '').trim(),
    bairro: String(raw.bairro ?? '').trim(),
    complemento: String(raw.complemento ?? '').trim(),
    image: String(raw.image ?? raw.imageUrl ?? '').trim(),
    tipo: tipoRaw ? toPartnershipType(tipoRaw, 0) : undefined,
    description: String(raw.description ?? raw.title ?? '').trim(),
    description_EN: String(
      raw.description_EN ?? raw.title_EN ?? raw.description ?? raw.title ?? ''
    ).trim(),
    url: String(raw.url ?? raw.link ?? '').trim(),
  }
}

function toPartnershipType(raw: RawRecord, index: number): PartnershipType {
  const orderRaw = raw.order ?? raw.type
  const parsedOrder =
    typeof orderRaw === 'number'
      ? orderRaw
      : typeof orderRaw === 'string'
      ? Number(orderRaw)
      : index + 1

  return {
    id: String(raw.id ?? ''),
    description: String(raw.description ?? raw.title ?? ''),
    description_EN: String(
      raw.description_EN ?? raw.title_EN ?? raw.description ?? raw.title ?? ''
    ),
    order: Number.isFinite(parsedOrder) ? parsedOrder : index + 1,
  }
}

function showApiError(err: unknown) {
  const error = err as {
    response?: {
      data?: {
        modelResult?: {
          message?: Array<{ message?: string }>
        }
      }
    }
  }

  const fallbackMessage = t('Ops! ocorreu um erro')
  const apiMessage = error.response?.data?.modelResult?.message?.[0]?.message

  Alert.alert('', apiMessage ? t(apiMessage) : fallbackMessage)
}

export function isPartnershipTypeUuid(type: string): boolean {
  return isUuid(type)
}

export async function getAllTypes(): Promise<PartnershipType[]> {
  try {
    const response = await api.get('Partnerships/GetAllTypes')
    const list = toRawArray(response.data)
    console.log('partnership types ->', list)
    return list.map((item, index) => toPartnershipType(item, index))
  } catch (err) {
    showApiError(err)
    throw err
  }
}

export async function getAllPartnerships(typeId?: string): Promise<Partnership[]> {
  try {
    const shouldSendType = Boolean(typeId && isUuid(typeId))
    const response = await api.get('Partnerships/GetAllPartnerships', {
      params: shouldSendType ? { Type: typeId } : undefined,
    })

    const list = toRawArray(response.data)
    return list.map(toPartnership)
  } catch (err) {
    showApiError(err)
    throw err
  }
}

export async function getPartnershipById(partnerId: string): Promise<Partnership | null> {
  try {
    const response = await api.get('Partnerships/GetPartnerships', {
      params: { PartnerId: partnerId },
    })

    const payload = response.data
    if (isRawRecord(payload)) {
      return toPartnership(payload)
    }

    const list = toRawArray(payload)
    return list.length > 0 ? toPartnership(list[0]) : null
  } catch (err) {
    showApiError(err)
    throw err
  }
}
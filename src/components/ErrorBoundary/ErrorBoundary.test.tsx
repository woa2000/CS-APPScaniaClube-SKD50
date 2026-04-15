import React from 'react'
import { Text } from 'react-native'
import { fireEvent, render } from '@testing-library/react-native'
import * as Updates from 'expo-updates'
import { ErrorBoundary } from './index'

function BrokenComponent() {
  throw new Error('forced crash')
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Text>Tela normal</Text>
      </ErrorBoundary>
    )

    expect(getByText('Tela normal')).toBeTruthy()
  })

  it('renders fallback and tries to reload app', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})

    const { getByText } = render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    )

    expect(getByText('Algo deu errado')).toBeTruthy()

    fireEvent.press(getByText('Reiniciar app'))
    expect(Updates.reloadAsync).toHaveBeenCalled()
  })
})

import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as Updates from 'expo-updates'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary captured error:', error, errorInfo)
  }

  private async handleReloadApp() {
    try {
      await Updates.reloadAsync()
    } catch (error) {
      console.error('Reload failed:', error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
            backgroundColor: '#F5F6F7'
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#24292F',
              marginBottom: 12
            }}
          >
            Algo deu errado
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              color: '#57606A',
              marginBottom: 20
            }}
          >
            O app encontrou um erro inesperado. Tente reiniciar para continuar.
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#D97D54',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 20
            }}
            onPress={() => this.handleReloadApp()}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Reiniciar app</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return this.props.children
  }
}

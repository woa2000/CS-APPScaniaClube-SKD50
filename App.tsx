import React from 'react';
import { 
  Montserrat_500Medium, 
  Montserrat_600SemiBold, 
  Montserrat_700Bold 
} from '@expo-google-fonts/montserrat'

import { 
  Roboto_300Light, 
  Roboto_500Medium, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto'

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/auth';
import AppLoading from 'expo-app-loading'
import { Routes } from './src/routes'
import { useFonts } from 'expo-font'

import './src/languages/i18n'

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'


export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_300Light
  })
  
  
  if (!fontsLoaded) {
    return (
      <AppLoading />
    )
  }
  
  return (   
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>    
    </NavigationContainer>
      
  )  
}
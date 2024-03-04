import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {View, ActivityIndicator} from 'react-native';

import {useAuth} from '../contexts/auth'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'


export function Routes() {
  const {signed, loading} = useAuth();

  if(loading){
      return(
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#666" />
          </View>
      );
  } 

  return  signed ? <AppRoutes /> :  <AuthRoutes />
  
}
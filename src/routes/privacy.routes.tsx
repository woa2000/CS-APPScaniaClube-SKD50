import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import { SignIn } from '../screens/SignIn'
import { Privacy } from '../screens/Privacy'

const Stack = createStackNavigator()

export function PrivacyRoutes(){
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Privacy" component={Privacy} />
        </Stack.Navigator>
    )
}
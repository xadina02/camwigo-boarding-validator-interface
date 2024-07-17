import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react';
import FloatingBottomTab from './components/FloatingBottomTab';
import ListScreen from './Screens/ListScreen'
import ReservationScreen from './Screens/ReservationScreen'
import TicketDetailsScreen from './Screens/TicketDetailsScreen'
import LoginScreen from './Screens/LoginScreen'
import MyHomeScreen from './Screens/MyHomeScreen'
import RegistrationScreen from './Screens/RegistrationScreen'
import PaymentScreen from './Screens/PaymentScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="MyHomeScreen" component={MyHomeScreen}/>
                <Stack.Screen name="ListScreen" component={ListScreen}/>
                <Stack.Screen name="ReservationScreen" component={ReservationScreen}/>
                <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
                <Stack.Screen name="TicketDetailsScreen" component={TicketDetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
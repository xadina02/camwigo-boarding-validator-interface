import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react';
import FloatingBottomTab from './components/FloatingBottomTab';
import QRCodeScannerScreen from './Screens/QRCodeScannerScreen'
import ConfirmationScreen from "./Screens/ConfirmationScreen";
import ReservationScreen from './Screens/ReservationScreen'
import TicketDetailsScreen from './Screens/TicketDetailsScreen'
import LoginScreen from './Screens/LoginScreen'
import HomeScreen from './Screens/HomeScreen'
import RegistrationScreen from './Screens/RegistrationScreen'
import PaymentScreen from './Screens/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="QRCodeScannerScreen" component={QRCodeScannerScreen}/>
                <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
                <Stack.Screen name="ReservationScreen" component={ReservationScreen}/>
                <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
                <Stack.Screen name="TicketDetailsScreen" component={TicketDetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
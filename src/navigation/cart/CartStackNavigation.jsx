import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';    
import CartScreens from '../../screens/cart/CartScreen';
import { NavigationContainer } from '@react-navigation/native';
    
const Stack = createNativeStackNavigator();

const CartStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cart" component={CartScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default CartStackNavigation

const styles = StyleSheet.create({})
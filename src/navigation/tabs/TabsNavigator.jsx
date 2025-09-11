import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductList, CartScreen, CategoryList } from '../../screens';
import { NavigationContainer } from "@react-navigation/native";
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import ShopStackNavigation from '../shop/ShopStackNavigator';
import CartStackNavigation from '../cart/CartStackNavigator';
import UserStackNavigation from '../user/UserNavigator';
const TabsNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="shop"
          // no mostrar en header
          
          component={ShopStackNavigation}
          //aplicar un icono
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name={"category"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserStackNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name={"account-box"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="cart"
          component={CartStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name={"shopping-cart"} color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </>
  )
}

export default TabsNavigator

const styles = StyleSheet.create({})
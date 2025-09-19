import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import CartStackNavigation from '../cart/CartStackNavigator';
import OrderStackNavigation from '../order/OrderStackNavigator';
import ShopStackNavigation from '../shop/ShopStackNavigator';
import UserStackNavigation from '../user/UserNavigator';
import Header from '../../components/Header';
import { colors } from '../../global/colors';
const TabsNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Header />
      <Tab.Navigator>
        <Tab.Screen
          name="Tienda"
          // screenOptions={{
          //   tabBarActiveTintColor: colors.primary,
          //   tabBarInactiveTintColor: colors.gray,
          // }}
          // no mostrar en header

          component={ShopStackNavigation}
          //aplicar un icono
          options={{
            headerShown: false,
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: colors.primary,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={"category"} color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Carrito"
          component={CartStackNavigation}
          options={{
            headerShown: false,
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: colors.primary,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={"shopping-cart"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Ordenes"
          component={OrderStackNavigation}
          options={{
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: colors.primary,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={"receipt"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={UserStackNavigation}
          options={{
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: colors.primary,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={"account-box"} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  )
}

export default TabsNavigator

const styles = StyleSheet.create({})
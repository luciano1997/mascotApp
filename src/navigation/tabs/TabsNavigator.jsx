import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import CartStackNavigation from '../cart/CartStackNavigator';
import OrderStackNavigation from '../order/OrderStackNavigator';
import ShopStackNavigation from '../shop/ShopStackNavigator';
import UserStackNavigation from '../user/UserNavigator';
import Header from '../../components/Header';
const TabsNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <>
    <Header />
      <Tab.Navigator>
        <Tab.Screen
          name="Tienda"
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
          name="Carrito"
          component={CartStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name={"shopping-cart"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Ordenes"
          component={OrderStackNavigation}
          options={{
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
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductList, CartScreen, CategoryList } from '../../screens';
import { NavigationContainer } from "@react-navigation/native";
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const TabsNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Categorias"
          component={CategoryList}
          //aplicar un icono
          options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name={"category"} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Productos"
          component={ProductList}
          options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name={"store"} color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabsNavigator

const styles = StyleSheet.create({})
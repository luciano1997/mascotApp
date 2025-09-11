import { createNativeStackNavigator } from '@react-navigation/native-stack';    
import CartScreens from '../../screens/cart/CartScreen';
    
const Stack = createNativeStackNavigator();

const CartStackNavigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Cart" component={CartScreens} />
      </Stack.Navigator>
  )
}

export default CartStackNavigation

import { createNativeStackNavigator } from '@react-navigation/native-stack';    
import UserProfileScreen from '../../screens/user/UserProfileScreen';
    
const Stack = createNativeStackNavigator();

const UserStackNavigation = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="profile" component={UserProfileScreen} />
      </Stack.Navigator>
  )
}

export default UserStackNavigation

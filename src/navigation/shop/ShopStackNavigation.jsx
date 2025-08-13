import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ProductCard, ProductList, CategoryList } from '../../screens';
const Stack = createNativeStackNavigator();


const ShopStackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CategoryList" component={CategoryList} />
                <Stack.Screen name="ProductList" component={ProductList} />
                <Stack.Screen name="ProductCard" component={ProductCard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default ShopStackNavigation;
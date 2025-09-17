import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useGetCategoriesQuery } from '../../services/shopApi'
import { colors } from '../../global/colors'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../../store/slices/shopSlice'
const CategoryList = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const {data:categories, isLoading, error} = useGetCategoriesQuery()
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(selectedCategory);

    }, [selectedCategory])
    return (
        <>

            <View style={styles.viewPrincipal}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) =>
                        <Pressable onPress={() => {
                            // Navega a la tab 'Productos' y le pasa el categoryId
                            //seteamos la categoria seleccionada
                            dispatch(setCategorySelected(item.id));
                            // onSelectCategory(item.id);
                            navigation.navigate("ProductList");
                        }
                        }>
                            <View style={styles.renderItem}>

                                <Text style={styles.textName}>{item.name} {item.icon}</Text>
                                <Text style={styles.textDescription}> {item.description}</Text>
                            </View>
                        </Pressable>
                    }
                />
            </View>
        </>
    )
}

export default CategoryList

const styles = StyleSheet.create({
    viewPrincipal: {
        backgroundColor: colors.lightGray,
    },
    renderItem: {
        borderRadius: 2,
        marginVertical: 5,
        marginTop: 10,
        padding: 20,
        width: "100%",
        height: 100,
        backgroundColor: colors.white,
        borderRadius: 25,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        marginBottom: 10,
    },
    textName: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: 'textMeOn'
    },
    textDescription: {
        textAlign: "center",
        fontFamily: 'textMeOn',
    }
})
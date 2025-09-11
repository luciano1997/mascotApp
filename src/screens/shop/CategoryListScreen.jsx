import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { loadFonts } from '../../../fonts'
import { useNavigation } from '@react-navigation/native'
import Search from '../../components/SearchComponent'
import { useGetCategoriesQuery } from '../../services/shopApi'
const CategoryList = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const {data:categories, isLoading, error} = useGetCategoriesQuery()
    const navigation = useNavigation();
    useEffect(() => {
        const loadFont = async () => {
            await loadFonts();
        };
        loadFont();
    }, [])
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
                            navigation.navigate("ProductList", { categoryId: item.id });
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

    },
    renderItem: {
        borderRadius: 2,
        backgroundColor: "beige",
        marginVertical: 10,
        padding: 30,
        width: "100%",
        borderRadius: 10
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
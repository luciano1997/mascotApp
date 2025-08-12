import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import categories from "../data/categories.json"
import { useEffect, useState } from 'react'
import { loadFonts } from '../../fonts'
const CategoryList = ({onSelectCategory}) => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    useEffect(()=> {
        const loadFont = async () => {
           await loadFonts();
        };
        loadFont();
    },[])
    useEffect(() => {
        console.log(selectedCategory);
        
    },[selectedCategory])
    return (
        <View style={styles.viewPrincipal}>
            <FlatList
                data={categories}
                renderItem={({ item }) =>
                    <Pressable onPress={() => {
                        onSelectCategory(item.id)
                    }
                    }>
                        <View style={styles.renderItem}>

                            <Text style={styles.textName}>{item.name}</Text>
                            <Text style={styles.textDescription}> {item.description}</Text>
                        </View>
                    </Pressable>
                }
            />
        </View>
    )
}

export default CategoryList

const styles = StyleSheet.create({
    viewPrincipal: {

    },
    renderItem: {
        borderRadius: 2,
        backgroundColor: "red",
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
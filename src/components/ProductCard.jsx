import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';


const ProductCard = ({ product, onPress }) => {

    return (
        <Pressable onPress={onPress} style={styles.card}>
            <FlatList
                data={product.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}
                style={{ maxHeight: 220 }}
            />

            {/* Información del producto */}
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.brand}>{product.brand}</Text>

                {/* Precio */}
                <View style={styles.priceContainer}>
                    {product.isOnSale && (
                        <Text style={styles.originalPrice}>
                            ${product.originalPrice?.toLocaleString()}
                        </Text>
                    )}
                    <Text style={styles.price}>
                        ${product.price.toLocaleString()}
                    </Text>
                </View>

                {/* Rating */}
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}> ⭐️ {product.rating}</Text>
                    <Text style={styles.reviews}>({product.reviews} reseñas)</Text>
                </View>

                {/* Tags */}
                {product.isOnSale && (
                    <View style={styles.saleTag}>
                        <Text style={styles.saleText}>OFERTA</Text>
                    </View>
                )}

                <Button icon="plus" mode="contained" onPress={() => console.log(product)}>
                    Agregar al carro
                </Button>
            </View>
        </Pressable>
    )
}

export default ProductCard

const styles = StyleSheet.create({

    card: {
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#fff',
        padding: 16,
        margin: 8,
    },
    info: {
        flex: 1,

    },
    image: {
        width: '200',
        height: 200,
        borderRadius: 8,
    },
    saleTag: {
        marginBottom: 10
    },
    reviews: {
        marginBottom: 10
    }
})
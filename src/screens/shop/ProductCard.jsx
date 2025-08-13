import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useState } from 'react';


const ProductCard = ({ product, onPress }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const images = product.images || [];

    const handlePrev = () => {
        setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
    const handleNext = () => {
        setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <Pressable onPress={onPress} style={styles.card}>
            <View style={styles.carouselContainer}>
                {images.length > 1 && (
                    <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
                        <Text style={styles.arrowText}>{'<'}</Text>
                    </TouchableOpacity>
                )}
                <Image
                    source={{ uri: images[imageIndex] }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {images.length > 1 && (
                    <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                        <Text style={styles.arrowText}>{'>'}</Text>
                    </TouchableOpacity>
                )}
            </View>

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
    );
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
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    arrowButton: {
        paddingHorizontal: 10,
        paddingVertical: 30,
    },
    arrowText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#888',
    },
    saleTag: {
        marginBottom: 10
    },
    reviews: {
        marginBottom: 10
    }
})
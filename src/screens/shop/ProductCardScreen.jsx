import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { addToCart } from '../../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../global/colors';


const ProductCard = ({ product }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const cartItems = useSelector(state => state.cartReducer.cartItems);
    const productInCart = cartItems.find(item => item.id === product.id);
    const [productquantity, setProductQuantity] = useState(productInCart ? productInCart.quantity : 0);

    // Sincroniza el estado local con el global
    useEffect(() => {
        setProductQuantity(productInCart ? productInCart.quantity : 0);
    }, [productInCart]);
    const images = product.images || [];
    const dispatch = useDispatch();

    const handlePrev = () => {
        setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
    const handleNext = () => {
        setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <View  style={styles.card}>
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
                <Text style={styles.brand}>{product.brand}</Text>
                <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={2}>{product.name}</Text>


                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}> ⭐️ {product.rating}</Text>
                        <Text style={styles.reviews}>({product.reviews} reseñas)</Text>
                    </View>
                </View>
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



                {product.isOnSale && (
                    <View style={styles.saleTag}>
                        <Text style={styles.saleText}>OFERTA</Text>
                    </View>
                )}
                {productquantity === 0 ? (
                    <Button icon="plus" style={styles.buttonAdd} mode="contained" onPress={() => {
                        dispatch(addToCart({ product: product, quantity: 1 }))
                        setProductQuantity(1)
                    }}>
                        Agregar al carro
                    </Button>
                ) : (
                    <View style={styles.counterContainer}>
                        <TouchableOpacity
                            style={styles.counterButton}
                            onPress={() => {
                                if (productquantity > 1) {
                                    setProductQuantity(productquantity - 1);
                                    dispatch(addToCart({ product: product, quantity: -1 }));
                                } else {
                                    setProductQuantity(0);
                                    dispatch(addToCart({ product: product, quantity: -1 }));
                                }
                            }}
                        >
                            <Text style={styles.counterText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{productquantity}</Text>
                        <TouchableOpacity
                            style={styles.counterButton}
                            onPress={() => {
                                setProductQuantity(productquantity + 1);
                                dispatch(addToCart({ product: product, quantity: 1 }));
                            }}
                        >
                            <Text style={styles.counterText}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    info: {
        flex: 1,
        paddingHorizontal: 8,
        fontFamily: 'textMeOn'

    },
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        gap: 20,
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
    },
    buttonAdd: {
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: colors.primary,
        color: colors.textLight,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    counterButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    counterText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        minWidth: 24,
        textAlign: 'center',
    },
    brand: {
        fontSize: 10,
        fontWeight: '700',
        color: '#555',
        marginBottom: 4,
        fontFamily: 'textMeOn'
    },
    originalPrice: {
        fontSize: 12,
        color: '#888',
        textDecorationLine: 'line-through',
    }, nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontFamily: 'textMeOn',
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        flex: 1,
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,    
        gap: 4
    },
    rating: {
        fontSize: 12,
        color: '#FFA500',
        fontWeight: '600',
    },
    reviews: {
        fontSize: 12,
        color: '#888',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
    },
    saleText: {
        backgroundColor: colors.secondary,
        textAlign: 'center',
        color: colors.textLight,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        fontSize: 12,
        fontWeight: '700',
        width: 65,
    },
})
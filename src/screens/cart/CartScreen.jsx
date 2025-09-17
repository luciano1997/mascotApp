import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../../global/colors'
import FlatCard from '../../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../store/slices/cartSlice'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { useCallback } from 'react'

const CartScreen = () => {
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const total = useSelector(state => state.cartReducer.total)
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total} </Text>
      <Pressable style={styles.confirmButton} onPress={() => navigation.navigate('OrderSummary')}>
        <Text style={styles.confirmButtonText}>Confirmar Compra</Text>
      </Pressable>
    </View>
  )
  useFocusEffect(
    useCallback(() => {
      // Esto fuerza el re-render al volver a la screen
    }, [cartItems])
  );
  const renderCartItem = ({ item }) => (
    console.log(item),

    <FlatCard style={styles.cartContainer}>
      <View>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.cartImage}
          resizeMode='cover'
        />
      </View>
      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
        <Text stlyle={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
        <Pressable onPress={() => dispatch(removeFromCart({ productId: item.id }))}>
          <Icon name="delete" size={24} color={colors.red} style={styles.trashIcon} />
        </Pressable>
      </View>
    </FlatCard>
  )

  return (
    <>
      {
        cartItems.length > 0
          ?
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
          />

          :
          <Text style={styles.emptyCartText}>Aún no hay productos en el carrito</Text>
      }
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartImage: {
    width: 80,
    height: 80
  },
  cartDescription: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginBottom: 16,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700'
  },
  trashIcon: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: -25
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: '700'
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 24,
    textAlign: "center",
    backgroundColor: colors.primary,
  },
  confirmButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',

  }, cartScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8
  },
  emptyCartText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8,
    fontFamily: 'textMeOn'
  },


})
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const Header = () => {


  return (
    <View style={styles.viewPrincipal}>
      <Text style={styles.text}>MascotApp</Text>
      <Text style={styles.subtitle}>Tu tienda de mascotas amiga </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    viewPrincipal: {
       
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
    },
    text: {
        fontSize: 40,
        fontWeight: '600',
        fontFamily: 'textMeOn'
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'textMeOn'
    }
})
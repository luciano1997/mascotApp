import { StyleSheet, Text, View } from 'react-native'

const Header = () => {
  return (
    <View style={styles.viewPrincipal}>
      <Text style={styles.text}>MascotApp</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    viewPrincipal: {
       
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})
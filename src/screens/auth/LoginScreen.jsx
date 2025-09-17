import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Alert, Pressable, Image } from 'react-native';
import { useLoginMutation } from '../../services/authApi';
import { setEmail, setLocalId, setIsLoggedIn } from '../../store/slices/authSlice';
import { useDispatch } from "react-redux";
import { colors } from '../../global/colors';
import { clearSession, saveSession } from '../../database';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const LoginScreen = ({ navigation }) => {

  const [emailInput, setEmailInput] = useState('luciano@gmail.com');
  const [passwordInput, setPasswordInput] = useState('Aa123456');
  const [persistSession, setPersistSession] = useState(false);
  const [triggerLogin, result] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    triggerLogin({ email: emailInput, password: passwordInput })

  };
  useEffect(() => {
    (async () => {
      if (result.status === "fulfilled") {
        try {
          if (persistSession) {
            await saveSession(result.data.localId, result.data.email);
            dispatch(setEmail(result.data.email))
            dispatch(setLocalId(result.data.localId))
            dispatch(setIsLoggedIn(true))
          } else {
            await clearSession();
            dispatch(setEmail(result.data.email))
            dispatch(setLocalId(result.data.localId))
            dispatch(setIsLoggedIn(true))
          }
        } catch (e) {
          Alert.alert("Error", "No se pudo guardar la sesión")
        }
      } else if (result.isError) {
        Alert.alert("Error", "No se pudo iniciar sesión, verifique sus credenciales")
      }
    })();

  }, [result])

  return (
    <View style={styles.container}>
      {/* //imagen logo */}
      <Image source={require('../../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={emailInput}
        onChangeText={setEmailInput}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={passwordInput}
        onChangeText={setPasswordInput}
        secureTextEntry
      />
       <Pressable style={styles.buttonIngresar} onPress={handleLogin}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.buttonText}>Ingresar </Text>
                    <MaterialIcons name="pets" size={18} color={colors.textLight}/>
                </View>
            </Pressable>
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        ¿No tienes cuenta? Regístrate
      </Text>
      <View style={styles.rememberMe}>
        <Text style={{ fontSize: 12 }}>¿Mantener sesión iniciada? </Text>
        <Switch
          onValueChange={() => setPersistSession(!persistSession)}
          value={persistSession}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  link: {
    marginTop: 15,
    fontSize: 12,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  rememberMe: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonIngresar: {
    backgroundColor: colors.primary,
    color: colors.textLight,
    padding: 10,
    borderRadius: 5,
    width: '90%',
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold', 
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 20,
  },
});

export default LoginScreen;
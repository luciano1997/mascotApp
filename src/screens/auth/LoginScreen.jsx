import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLoginMutation } from '../../services/authApi';
import { setEmail,setLocalId, setIsLoggedIn } from '../../store/slices/authSlice';
import { useDispatch } from "react-redux";

const LoginScreen = ({ navigation }) => {

  const [emailInput, setEmailInput] = useState('luciano@gmail.com');
  const [passwordInput, setPasswordInput] = useState('Aa123456');
  const [triggerLogin, result] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log("handleLogin");
    triggerLogin({email: emailInput, password: passwordInput})

  };
    useEffect(()=>{
      if(result.status==="fulfilled"){
          console.log("Resultado del login", result.data)
            dispatch(setEmail(result.data.email))
            dispatch(setLocalId(result.data.localId))
            dispatch(setIsLoggedIn(true))
        }
    },[result])
   
  return (
    <View style={styles.container}>
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
      <Button title="Ingresar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        ¿No tienes cuenta? Regístrate
      </Text>
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
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  link: {
    marginTop: 15,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSignupMutation } from '../../services/authApi';
import { setEmail } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';

const RegisterScreen = ({ navigation }) => {
    const [emailInput, setEmailInput] = useState('lucianogarridosepulveda1@gmail.com');
    const [password, setPassword] = useState('Aa123456');
    const [confirmPassword, setConfirmPassword] = useState('Aa123456');
    const [triggerSignup, result] = useSignupMutation();

    const handleRegister = () => {
        triggerSignup({ email, password });
    };
    const dispatch = useDispatch(); 
    useEffect(() => {
       if (result.isSuccess) {
        console.log("result usefect", result);
        // dispatch(setEmail(result.data.email));
        // navigation.replace('Login');
    }
    if (result.isError) {
        // Mostrar error
        console.log("Error en el registro:", result.error);
    }

    }, [result]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
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
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Registrarse" onPress={handleRegister} />
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                ¿Ya tienes cuenta? Inicia sesión
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

export default RegisterScreen;

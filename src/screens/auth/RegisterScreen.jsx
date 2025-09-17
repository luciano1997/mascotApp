import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from 'react-native';
import { useSignupMutation } from '../../services/authApi';
import { setEmail, setLocalId, setIsLoggedIn } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { colors } from '../../global/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const RegisterScreen = ({ navigation }) => {
    const [emailInput, setEmailInput] = useState('lucianogarridosepulveda4@gmail.com');
    const [password, setPassword] = useState('Aa123456');
    const [confirmPassword, setConfirmPassword] = useState('Aa123456');
    const [triggerSignup, result] = useSignupMutation();

    const handleRegister = () => {

        triggerSignup({ email: emailInput, password});
    };
    const dispatch = useDispatch();
    useEffect(() => {
        if (result.status === "fulfilled") {
            console.log("registro existoso", result);
            
            dispatch(setEmail(result.data.email));
            dispatch(setLocalId(result.data.localId));
            dispatch(setIsLoggedIn(true));

        }
        if (result.isError) {
            // Mostrar error
            console.log("Error en el registro:", result.error);
        }

    }, [result]);
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/icon.png')} style={styles.logo} />
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
            <Pressable style={styles.button} onPress={handleRegister}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.buttonText}>Registrarse </Text>
                    <MaterialIcons name="pets" size={18} color={colors.textLight} />
                </View>
            </Pressable>
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
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 20,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.textLight,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;

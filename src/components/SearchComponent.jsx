import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const Search = ({ placeholder }) => {
    // Estado para capturar el texto ingresado
    const [texto, setTexto] = useState('');
    // Estado para controlar el mensaje de error
    const [error, setError] = useState('');

    // Función para validar la entrada del usuario
    const validarTexto = (input) => {
        setTexto(input); // Siempre permite escribir
        const regex = /^[A-Za-z\s]*$/; // Permite letras y espacios, incluso vacío
        if (input === '') {
            setError('El campo no puede estar vacío');
        } else if (!regex.test(input)) {
            setError('Solo se permiten letras');
        } else {
            setError('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]} // Se aplica estilo de error si hay un mensaje de error
                placeholder={placeholder || 'Buscar...'}
                value={texto}
                onChangeText={(e) => setTexto(e)} // Validación en tiempo real
            />

            {/* Mensaje de error si la validación falla */}
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
});

export default Search;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { URL } from '@env';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useUser();

    const [isFormValid, setIsFormValid] = useState(false);

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordStrong = (senha) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(senha);
    };

    useEffect(() => {
        if (nome.length < 3) {
            setErrorMessage('O nome deve ter pelo menos 3 caracteres.');
            setIsFormValid(false);
        } else if (nome.length > 15) {
            setErrorMessage('O nome deve ter no máximo 15 caracteres.');
            setIsFormValid(false);
        } else if (!isEmailValid(email)) {
            setErrorMessage('O e-mail não é válido.');
            setIsFormValid(false);
        } else if (!isPasswordStrong(senha)) {
            setErrorMessage('A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.');
            setIsFormValid(false);
        } else if (senha !== confirmarSenha) {
            setErrorMessage('As senhas não coincidem.');
            setIsFormValid(false);
        } else {
            setErrorMessage('');
            setIsFormValid(true);
        }
    }, [nome, email, senha, confirmarSenha]);

    const handleCadastro = () => {
        axios.post(`http://${URL}:8080/inserirCadastro`, { nome, email, senha })
            .then((response) => {
                console.log(response.data)
                if (response.data === 'Cadastro realizado') {
                    const dadosUsuario = { nome, email, senha };
                    setUser(dadosUsuario);

                    navigation.dispatch(
                        CommonActions.reset({ index: 0, routes: [{ name: 'TabRoutes' }] })
                    );
                } else {
                    Alert.alert('Erro', 'Falha ao cadastrar. Tente novamente.');
                }
            })
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={require('@/assets/icon.png')} style={styles.image}/>
            </View>


            <Text style={styles.title}>Criar Conta</Text>

            <TextInput style={styles.input} placeholder="Insira seu nome de usuário" value={nome} onChangeText={(text) => setNome(text.slice(0, 15))} />
            <TextInput style={styles.input} placeholder="Insira seu e-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />

            <View style={styles.passwordContainer}>
                <TextInput style={[styles.passwordInput]} placeholder="Insira sua senha" secureTextEntry={!mostrarSenha} value={senha} onChangeText={setSenha} />

                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                    <Icon name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
                <TextInput style={[styles.passwordInput]} placeholder="Confirme sua senha" secureTextEntry={!mostrarSenha} value={confirmarSenha} onChangeText={setConfirmarSenha} />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                    <Icon name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <TouchableOpacity style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]} onPress={handleCadastro} disabled={!isFormValid}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontFamily: 'FibraOneBold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 10
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        height: 50,
    },
    passwordInput: {
        flex: 1,
    },
    button: {
        backgroundColor: 'green',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    linkText: {
        color: 'gray',
        textAlign: 'center',
        fontFamily: 'FibraOneBold'
    },
    errorMessage: {
        fontSize: 12,
        color: 'red',
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'FibraOneBold'
    },image: {
        width: '100%',
        height: '100%', 
        resizeMode: 'contain',
    },
    iconContainer: {
        width: '100%',
        height: 130,
        marginTop: 10
    }
});
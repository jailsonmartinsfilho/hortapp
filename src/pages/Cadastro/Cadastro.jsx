import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert  } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { useUser } from '../../context/UserContext';


export default function Cadastro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { setUser } = useUser();

    const handleCadastro = () => {
        axios.post('http://192.168.0.108:8080/inserirCadastro', { nome, email, senha })
            .then((response) => {
                if (response.data === 'Cadastro realizado') { 
                    const dadosUsuario = { nome, email }; 
                    setUser(dadosUsuario); 

                    navigation.dispatch(
                        CommonActions.reset({index: 0, routes: [{ name: 'TabRoutes' }], }));                
                    } else {
                    Alert.alert('Erro', 'Falha ao cadastrar. Tente novamente.');
                }
            }).catch((error) => { 
                console.error(error);
                Alert.alert('Erro', 'Erro ao se conectar ao servidor.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>

            <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome}/>
            
            <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail}/>
            
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha}/>

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
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
        color: 'blue',
        textAlign: 'center',
        marginTop: 10,
    },
});

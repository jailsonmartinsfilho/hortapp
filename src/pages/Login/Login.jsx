// Concluído, revisado, otimizado e padronizado por Jailson Martins às 16:00 de 04/12/2024.

import { URL } from '@env';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../context/UserContext';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const { setUser } = useUser();

    const formularioValido = email.length > 0 && senha.length > 0;

    const handleLogin = () => {
        axios.post(`http://${URL}/realizarLogin`, { email, senha })
            .then((response) => {
                if (response.status === 200) {
                    const { nome } = response.data;
                    const dadosUsuario = { nome, email };
                    setUser(dadosUsuario);
                    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'TabRoutes' }] }));
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        Alert.alert('Email inválido', 'Não existe uma conta com o e-mail inserido.');
                    } else if (error.response.status === 401) {
                        Alert.alert('Senha incorreta', 'A senha inserida está incorreta');
                    } else {
                        Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente.');
                    }
                } else {
                    Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
                }
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerDemeterChan}>
                <Image source={require('@/assets/icon.png')} style={styles.demeterChan} />
            </View>

            <Text style={styles.textoCriarConta}>Entre na sua conta</Text>

            <TextInput style={styles.entradasDeCredenciais} placeholder="Insira seu e-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />

            <View style={styles.containerEntradasDeSenha}>
                <TextInput style={styles.entradasDeSenha} placeholder="Insira sua senha" secureTextEntry={!mostrarSenha} value={senha} onChangeText={setSenha} />

                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                    <Icon style={{ marginRight: -5 }} name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.botaoEntrar, { opacity: formularioValido ? 1 : 0.5 }]} onPress={handleLogin} disabled={!formularioValido}>
                <Text style={styles.textoBotaoEntrar}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoJaTenhoUmaConta} onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.textoJaTenhoUmaConta}>Não tenho uma conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#ffffff' },
    containerDemeterChan: { width: '100%', height: 180, width: 180, marginTop: 85 },
    demeterChan: { width: '100%', height: '100%', resizeMode: 'contain' },
    textoCriarConta: { fontSize: 30, fontFamily: 'FibraOneBold', color: '#202420', textAlign: 'center', marginTop: 50, marginBottom: 15 },
    entradasDeCredenciais: { fontFamily: 'FibraOneMedium', fontSize: 15, height: 50, borderColor: '#ccd3de', borderRadius: 8, borderWidth: 1, width: 285, marginBottom: 15, paddingLeft: 20, paddingRight: 20 },
    containerEntradasDeSenha: { display: 'flex', flexDirection: 'row', alignItems: 'center', height: 50, borderColor: '#ccd3de', borderRadius: 8, borderWidth: 1, width: 285, marginBottom: 15, paddingLeft: 20, paddingRight: 20 },
    entradasDeSenha: { flex: 1, fontFamily: 'FibraOneMedium', fontSize: 15 },
    botaoEntrar: { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1fcc98', height: 55, borderRadius: 50, justifyContent: 'center', width: 260, marginLeft: 15 },
    textoBotaoEntrar: { fontSize: 19, fontFamily: 'FibraOneBold', color: '#fff' },
    textoJaTemUmaConta: { color: 'gray', textAlign: 'center', fontFamily: 'FibraOneBold' },
    botaoJaTenhoUmaConta: { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1fcc98', height: 45, borderRadius: 50, justifyContent: 'center', width: 210, marginLeft: 20, marginTop: 20 },
    textoJaTenhoUmaConta: { fontFamily: 'FibraOneBold', color: '#fff', fontSize: 15 },
});
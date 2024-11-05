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
        console.log("wa")
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

            <Text style={styles.textoCriarConta}>Login</Text>

            <TextInput style={styles.entradasDeTexto} placeholder="Insira seu e-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />

            <View style={styles.containerEntradasDeSenha}>
                <TextInput style={styles.entradasDeSenha} placeholder="Insira sua senha" secureTextEntry={!mostrarSenha} value={senha} onChangeText={setSenha} />

                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                    <Icon style={{ marginRight: 5 }} name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.botaoCadastrar, { opacity: formularioValido ? 1 : 0.5 }]} onPress={handleLogin} disabled={!formularioValido}>
                <Text style={styles.textoBotaoCadastrar}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.textoJaTemUmaConta}>Não tem uma conta? Cadastre-se!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#fff', alignItems: 'center' },
    textoCriarConta: { fontSize: 24, fontFamily: 'FibraOneBold', color: '#333', marginBottom: 10, textAlign: 'center', marginTop: 10 },
    entradasDeTexto: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, fontFamily: 'FibraOneBold', marginBottom: 15, paddingLeft: 20, width: '85%' },
    containerEntradasDeSenha: { flexDirection: 'row', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 10, height: 60, paddingLeft: 20, width: '85%' },
    entradasDeSenha: { flex: 1, fontFamily: 'FibraOneBold' },
    botaoCadastrar: { backgroundColor: '#5cad39', borderBottomWidth: 5, borderRightWidth: 5, borderColor: '#66B142', height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10, paddingHorizontal: 25, elevation: 2 },
    textoBotaoCadastrar: { color: '#fff', fontSize: 20, fontFamily: 'FibraOneBold' },
    textoJaTemUmaConta: { color: 'gray', textAlign: 'center', fontFamily: 'FibraOneBold' },
    mensagemErro: { fontSize: 12, color: 'red', marginBottom: 15, textAlign: 'center', fontFamily: 'FibraOneBold' },
    demeterChan: { width: '100%', height: '100%', resizeMode: 'contain' },
    containerDemeterChan: { width: '100%', height: 100, marginTop: 10 }
});
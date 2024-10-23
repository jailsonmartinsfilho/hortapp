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
    const [mostrarSenha2, setMostrarSenha2] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const { setUser } = useUser();
    const [formularioValido, setFormularioValido] = useState(false);

    const emailValido = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const senhaForte = (senha) => {
        const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return senhaRegex.test(senha);
    };

    useEffect(() => {
        if (nome.length < 3) {
            setMensagemErro('O nome deve ter pelo menos 3 caracteres.');
            setFormularioValido(false);
        } else if (nome.length > 15) {
            setMensagemErro('O nome deve ter no máximo 15 caracteres.');
            setFormularioValido(false);
        } else if (!emailValido(email)) {
            setMensagemErro('O e-mail não é válido.');
            setFormularioValido(false);
        } else if (!senhaForte(senha)) {
            setMensagemErro('A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.');
            setFormularioValido(false);
        } else if (senha !== confirmarSenha) {
            setMensagemErro('As senhas não coincidem.');
            setFormularioValido(false);
        } else {
            setMensagemErro('');
            setFormularioValido(true);
        }
    }, [nome, email, senha, confirmarSenha]);

    const handleCadastro = () => {
        axios.post(`http://${URL}:8080/inserirCadastro`, { nome, email, senha })
            .then((response) => {
                if (response.status === 200) {
                    Alert.alert('Cadastro realizado com sucesso!', 'Você precisa realizar o login para acessar sua conta.');
                    navigation.navigate('Login');
                } else {
                    Alert.alert('Erro', 'Falha ao cadastrar. Tente novamente.');
                }
            })
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerDemeterChan}>
                <Image source={require('@/assets/icon.png')} style={styles.demeterChan} />
            </View>

            <Text style={styles.textoCriarConta}>Criar Conta</Text>

            <TextInput style={styles.entradasDeTexto} placeholder="Insira seu nome de usuário" value={nome} onChangeText={(text) => setNome(text.slice(0, 15))} />
            <TextInput style={styles.entradasDeTexto} placeholder="Insira seu e-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />

            <View style={styles.containerEntradasDeSenha}>
                <TextInput style={[styles.entradasDeSenha]} placeholder="Insira sua senha" secureTextEntry={!mostrarSenha} value={senha} onChangeText={setSenha} />

                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                    <Icon style={{ marginRight: 5 }} name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.containerEntradasDeSenha}>
                <TextInput style={[styles.entradasDeSenha]} placeholder="Confirme sua senha" secureTextEntry={!mostrarSenha2} value={confirmarSenha} onChangeText={setConfirmarSenha} />

                <TouchableOpacity onPress={() => setMostrarSenha2(!mostrarSenha2)}>
                    <Icon style={{ marginRight: 5 }} name={mostrarSenha2 ? 'eye-off' : 'eye'} size={24} color="gray" />
                </TouchableOpacity>
            </View>

            {mensagemErro ? <Text style={styles.mensagemErro}>{mensagemErro}</Text> : null}

            <TouchableOpacity style={[styles.botaoCadastrar, { opacity: formularioValido ? 1 : 0.5 }]} onPress={handleCadastro} disabled={!formularioValido}>
                <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textoJaTemUmaConta}>Já tem uma conta? Faça login</Text>
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
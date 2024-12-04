// Concluído, revisado, otimizado e padronizado por Jailson Martins às 15:45 de 04/12/2024.

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { URL } from '@env';
import { useUser } from '../../context/UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Cadastro({ navigation }) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erroNome, setErroNome] = useState(false);
    const [erroEmail, setErroEmail] = useState(false);
    const [erroSenha, setErroSenha] = useState(false);
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState(false);
    const [formularioValido, setFormularioValido] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarSenha2, setMostrarSenha2] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [dadosUsuario, setDadosUsuario] = useState(null);
    const [telaAtual, setTelaAtual] = useState('cadastro');
    const [codigoUsuario, setCodigoUsuario] = useState('');
    const [codigoServidor, setCodigoServidor] = useState(null);

    const { setUser } = useUser();

    const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const senhaForte = (senha) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);

    useEffect(() => {
        if (nome.length < 3 || nome.length > 15) {
            setMensagemErro('O nome deve ter entre 3 e 15 caracteres.');
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

    useEffect(() => {
        if (nome && (nome.length < 3 || nome.length > 15)) {
            setErroNome(true);
            setMensagemErro('O nome deve ter entre 3 e 15 caracteres.');
        } else {
            setErroNome(false);
        }
    }, [nome]);

    useEffect(() => {
        if (email && (!emailValido(email))) {
            setErroEmail(true);
            setMensagemErro('O e-mail não é válido.');
        } else {
            setErroEmail(false);
        }
    }, [email]);

    useEffect(() => {
        if (senha && (!senhaForte(senha))) {
            setErroSenha(true);
            setMensagemErro('A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.');
        } else {
            setErroSenha(false);
        }
    }, [senha]);

    useEffect(() => {
        if (confirmarSenha && (senha !== confirmarSenha)) {
            setErroConfirmarSenha(true);
            setMensagemErro('As senhas não coincidem.');
        } else {
            setErroConfirmarSenha(false);
        }
    }, [senha, confirmarSenha]);

    const handleCadastro = async () => {
        console.log("Iniciando processo de cadastro...");

        try {
            console.log("Enviando dados para inserção de cadastro...");
            const cadastroResponse = await axios.post(`http://${URL}/inserirCadastro`, { nome, email, senha });
            console.log("Resposta do backend ao inserir cadastro:", cadastroResponse.data);

            const dadosUsuario = cadastroResponse.data;
            setDadosUsuario(dadosUsuario);

            console.log("Enviando solicitação para verificação de email...");
            const verificarResponse = await axios.post(`http://${URL}/verificarEmail`, { email });
            console.log("Resposta do backend ao verificar email:", verificarResponse.data);

            setCodigoServidor(verificarResponse.data.codigoVerificacao);
            setTelaAtual('verificacao');
        } catch (error) {
            console.error("Erro no processo de cadastro:", error);
            alert("Ocorreu um erro. Por favor, tente novamente.");
        }
    };

    const handleVerificarCodigo = () => {
        if (parseInt(codigoUsuario) === codigoServidor) {
            Alert.alert(
                'Seu e-mail foi verificado!',
                'Agora você pode começar a utilizar o HortApp',
                [
                    { text: 'OK' }
                ]
            );
            setUser(dadosUsuario);
            navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'TabRoutes' }] }));
        } else {
            Alert.alert(
                'Erro na verificação',
                'Código incorreto. Tente novamente.',
                [
                    { text: 'OK' }
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            {telaAtual === 'cadastro' && (
                <View>
                    <TouchableOpacity style={[styles.botaoVoltar, !exibirFormulario && { display: 'none' }]} onPress={() => setExibirFormulario(false)}>
                        <Icon name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    <View style={styles.containerDemeterChan}>
                        <Image source={require('@/assets/images/icon.png')} style={styles.demeterChan} />
                    </View>

                    <Text style={styles.textoCriarConta}>Crie sua conta</Text>

                    {!exibirFormulario ? (
                        <View style={styles.containerCentral}>
                            <TouchableOpacity style={[styles.botaoCriarContaCom, { backgroundColor: '#ffffff' }]} onPress={() => console.log('Criar conta com Google')}>
                                <Image source={require('@/assets/images/google.png')} style={{ height: 35, width: 35 }} />
                                <Text style={[styles.textoBotaoCadastrar, { color: 'black' }]}>Criar conta com Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.botaoCriarContaCom, { backgroundColor: '#5a93ed' }]} onPress={() => setExibirFormulario(true)}>
                                <Image source={require('@/assets/images/email.png')} style={{ height: 30, width: 30, marginLeft: 5 }} />
                                <Text style={styles.textoBotaoCadastrar}>Criar conta com E-mail</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.botaoJaTenhoUmaConta} onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.textoJaTenhoUmaConta}>Já tenho uma conta</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <TextInput style={[styles.entradasDeCredenciais, erroNome && styles.erroBorda]} placeholder="Insira seu nome de usuário" value={nome} onChangeText={(text) => setNome(text.slice(0, 15))} />
                            <TextInput style={[styles.entradasDeCredenciais, erroEmail && styles.erroBorda]} placeholder="Insira seu e-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />

                            <View style={[styles.containerEntradasDeSenha, erroSenha && styles.erroBorda]}>
                                <TextInput style={styles.entradasDeSenha} placeholder="Insira sua senha" secureTextEntry={!mostrarSenha} value={senha} onChangeText={setSenha} />
                                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                                    <Icon style={{ paddingLeft: 10 }} name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="gray" />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.containerEntradasDeSenha, erroConfirmarSenha && styles.erroBorda]}>
                                <TextInput style={styles.entradasDeSenha} placeholder="Confirme sua senha" secureTextEntry={!mostrarSenha2} value={confirmarSenha} onChangeText={setConfirmarSenha} />
                                <TouchableOpacity onPress={() => setMostrarSenha2(!mostrarSenha2)}>
                                    <Icon style={{ paddingLeft: 10 }} name={mostrarSenha2 ? 'eye-off' : 'eye'} size={24} color="gray" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.containerMensagemErro}>
                                {mensagemErro && (
                                    <View>
                                        <FontAwesome5 name="exclamation-triangle" size={15} color="red" style={{ position: 'absolute', left: -20, top: 0 }} />
                                        <FontAwesome5 name="exclamation-triangle" size={15} color="red" style={{ position: 'absolute', right: -20, top: 0 }} />
                                        <Text style={styles.mensagemErro}>{mensagemErro}</Text>
                                    </View>
                                )}
                             </View>

                            <TouchableOpacity style={[styles.botaoCadastrar, { opacity: formularioValido ? 1 : 0.5 }]} onPress={handleCadastro} disabled={!formularioValido}>
                                <Text style={styles.textoBotaoCadastrar}>Continuar para a verificação</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}

            {telaAtual === 'verificacao' && (
                <View>
                    <View style={styles.containerDemeterChan}>
                        <Image source={require('@/assets/icon.png')} style={styles.demeterChan} />
                    </View>

                    <Text style={styles.textoCriarConta}>Verifique seu e-mail</Text>

                    <TextInput style={styles.entradasDeCredenciais} placeholder="Insira o código de verificação" keyboardType="number-pad" value={codigoUsuario} onChangeText={setCodigoUsuario} />

                    <TouchableOpacity style={styles.botaoCadastrar} onPress={handleVerificarCodigo}>
                        <Text style={[styles.textoBotaoCadastrar, { fontSize: 18 }]}>Verificar Código</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#ffffff' },
    botaoVoltar: { position: 'absolute', top: 40, left: -20, padding: 10 },
    containerDemeterChan: { width: '100%', height: 180, width: 180, marginTop: 85, marginLeft: 55 },
    demeterChan: { width: '100%', height: '100%', resizeMode: 'contain' },
    textoCriarConta: { fontSize: 30, fontFamily: 'FibraOneBold', color: '#202420', textAlign: 'center', marginTop: 50, marginBottom: 15 },
    botaoCriarContaCom: { display: 'flex', flexDirection: 'row', backgroundColor: '#5cad39', alignItems: 'center', gap: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ccd3de', width: 285, height: 60, paddingLeft: 15, marginBottom: 10 },
    botaoJaTenhoUmaConta: { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1fcc98', height: 45, borderRadius: 50, justifyContent: 'center', width: 190, marginLeft: 55, marginTop: 20 },
    textoJaTenhoUmaConta: { fontFamily: 'FibraOneBold', color: '#fff', fontSize: 15 },
    entradasDeCredenciais: { fontFamily: 'FibraOneMedium', fontSize: 15, height: 50, borderColor: '#ccd3de', borderRadius: 8, borderWidth: 1, width: 285, marginBottom: 15, paddingLeft: 20, paddingRight: 20 },
    containerEntradasDeSenha: { display: 'flex', flexDirection: 'row', alignItems: 'center', height: 50, borderColor: '#ccd3de', borderRadius: 8, borderWidth: 1, width: 285, marginBottom: 15, paddingLeft: 20, paddingRight: 20 },
    entradasDeSenha: { flex: 1, fontFamily: 'FibraOneMedium', fontSize: 15 },
    containerMensagemErro: { display: 'flex', justifyContent: 'center', width: 285, minHeight: 60 },
    mensagemErro: { fontFamily: 'FibraOneMedium', fontSize: 12, color: 'red', textAlign: 'center', marginBottom: 15 },
    botaoCadastrar: {  display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1fcc98', height: 55, borderRadius: 50, justifyContent: 'center', width: 260, marginLeft: 15 },
    textoBotaoCadastrar: { fontSize: 14, fontFamily: 'FibraOneBold', color: '#fff' },
    erroBorda: { borderColor: 'red' }
});
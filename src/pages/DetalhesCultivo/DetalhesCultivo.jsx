import { URL } from '@env';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetalhesCultivo({ route }) {
    const { planta } = route.params;
    const navigation = useNavigation();
    const [detalhesCultivo, setDetalhesCultivo] = useState(null);

    const imagensPlantas = {
        batata: require('@/assets/images/batata.png'),
        couve: require('@/assets/images/couve.png'),
        'couve-flor': require('@/assets/images/couveflor.png'),
        tomate: require('@/assets/images/tomate.png'),
    };

    useFocusEffect(
        React.useCallback(() => {
            console.log('wa')
            axios.post(`http://${URL}/buscarDetalhesCultivo`, { planta: planta.id_cultivo })
            .then((response) => {
                setDetalhesCultivo(response.data[0]);
            })
        }, [planta])
    );

    if (!detalhesCultivo) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.containerNome}>
                    <Text style={styles.nome}>{detalhesCultivo.nome_planta}</Text>
                </View>

                <View style={styles.containerDoContainerImagem}>
                    <View style={styles.containerImagem}>
                        <Image source={imagensPlantas[(planta.nome_planta).toLowerCase()]} style={styles.imagem} />
                    </View>
                </View>

                <View style={styles.infosecaocultivo}>
                    <Text style={styles.tituloinfo}>Data de Início</Text>
                    <Text style={styles.info}>{new Date(detalhesCultivo.data_inicio).toLocaleDateString()}</Text>
                </View>

                <View style={styles.infosecaocultivo}>
                    <Text style={styles.tituloinfo}>Data Estimada de Colheita</Text>
                    <Text style={styles.info}>{new Date(detalhesCultivo.data_estimativa_colheita).toLocaleDateString()}</Text>
                </View>

                <View style={styles.infosecaocultivo}>
                    <Text style={styles.tituloinfo}>Progresso do Cultivo</Text>
                    <Text style={styles.info}>{detalhesCultivo.progresso_cultivo}%</Text>
                </View>

                <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('Garden')}>
                    <Text style={styles.textoVoltar}>Voltar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#D4D4D4', paddingTop: 25, paddingBottom: 70 },
    nome: { fontSize: 50, marginBottom: 10, fontFamily: 'FibraOneBold' },
    botaoVoltar: { backgroundColor: '#5cad39', borderBottomWidth: 5, borderRightWidth: 5, borderColor: '#66B142', height: 55, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10, paddingHorizontal: 15, elevation: 2, marginTop: 20, marginBottom: 25, width: '80%' },
    textoVoltar: { color: '#fff', fontSize: 20, fontFamily: 'FibraOneBold' },
    tituloinfo: { fontSize: 29, marginBottom: 5, fontFamily: 'FibraOneBold' },
    info: { fontSize: 20, marginBottom: 5, fontFamily: 'FibraOneBold' },
    infosecaocultivo: { fontSize: 20, marginTop: 20, marginBottom: 5, fontFamily: 'FibraOneBold', borderWidth: 3, borderColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingVertical: 18, paddingHorizontal: 10, backgroundColor: '#E4E7E4', width: '95%' },
    containerNome: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    containerImagem: { alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: 'white', borderRadius: 200, width: 180, height: 180, backgroundColor: '#B6BDAF', elevation: 3 },
    containerDoContainerImagem: { alignItems: 'center' },
    imagem: { height: 80, width: 80, borderWidth: 1, resizeMode: 'contain' }
});
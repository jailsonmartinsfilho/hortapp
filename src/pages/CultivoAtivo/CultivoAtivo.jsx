import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, Image, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { URL } from '@env';

export default function CultivoAtivo({ route }) {
    const { planta } = route.params;
    const [detalhesPlanta, setDetalhesPlanta] = useState([]);

    const imagensPlantas = {
        batata: require('@/assets/images/batata.png'),
        couve: require('@/assets/images/couve.png'),
        'couve-flor': require('@/assets/images/couveflor.png'),
        tomate: require('@/assets/images/tomate.png'),
    };

    useEffect(() => {
        axios.post(`http://${URL}:8080/buscarDetalhesPlanta`, { planta: planta.nome })
            .then((response) => {
                setDetalhesPlanta(response.data[0]);
            })
    }, [planta]);

    if (!detalhesPlanta) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
                <ScrollView style={styles.ScrollView}>
                <View style={styles.containerNome}> 
                    <Text style={styles.nome}>{detalhesPlanta.nome}</Text>
                </View>

                <View style={styles.containerDoContainerImagem}>
                    <View style={styles.containerImagem}> 
                        <Image source={imagensPlantas[(planta.nome).toLowerCase()]} style={styles.imagem}/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#D4D4D4',
        paddingTop: 25,
    },
    nome: {
        fontSize: 50,
        marginBottom: 10,
        fontFamily: 'FibraOneBold'
    },
    botaoComecarPlantacao: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 20,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100
    },
    textoComecarPlantacao: {
        color: 'white',
        fontSize: 24
    },
    tituloinfo: {
        fontSize: 29,
        marginBottom: 5,
        fontFamily: 'FibraOneBold'

    },
    info: {
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'FibraOneBold',
    },
    infosecaocultivo: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 5,
        fontFamily: 'FibraOneBold',
        borderWidth: 3,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 18,
        backgroundColor: '#E4E7E4'
    },
    imagem: {
        height: 80,
        width: 80,
        borderWidth: 1,
        resizeMode: 'contain',
      }, 
      containerNome: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerImagem: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 200,
        width: 180,
        height: 180,
        backgroundColor: '#B6BDAF',
        elevation: 3,
    },
    containerDoContainerImagem: {
        alignItems: 'center',
    },
});

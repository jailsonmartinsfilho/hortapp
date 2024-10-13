import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, Image, View } from 'react-native';
import axios from 'axios';

export default function DetalhePlanta({ route }) {
    const { planta } = route.params;
    const [detalhesPlanta, setDetalhesPlanta] = useState([]);

    const imagensPlantas = {
        batata: require('@/assets/images/batata.png'),
        couve: require('@/assets/images/couve.png'),
        'couve-flor': require('@/assets/images/couveflor.png'),
        tomate: require('@/assets/images/tomate.png'),
      };

    useEffect(() => {
        axios.post('http://192.168.0.104:8080/buscarDetalhesPlanta', { planta: planta.nome })
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

                
                <View style={styles.infosecao}>
                    <Text style={styles.tituloinfo}>Tempo de cultivo ⏱️</Text>
                    <Text style={styles.info}>{detalhesPlanta.tempo_cultivo}</Text>
                </View>
                
                <View style={styles.infosecao}>
                    <Text style={styles.tituloinfo}>Modo de cultivo 🌱</Text>
                    <Text style={styles.info}>{detalhesPlanta.modo_cultivo}</Text>
                </View>

                <View style={styles.infosecao}>
                    <Text style={styles.tituloinfo}>Clima ideal ☀️</Text>
                    <Text style={styles.info}>{detalhesPlanta.clima_ideal}</Text>
                </View>

                <View style={styles.infosecao}>
                    <Text style={styles.tituloinfo}>Tipo de solo 🪨</Text>
                    <Text style={styles.info}>{detalhesPlanta.tipo_solo}</Text>
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
        paddingBottom: 70,
        paddingTop: 25,
    },
    nome: {
        fontSize: 50,
        marginBottom: 10,
    },
    tituloinfo: {
        fontSize: 29,
        marginBottom: 5,
    },
    info: {
        fontSize: 20,
        marginBottom: 5,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        // Simulação de sombra interna com bordas e cor de fundo
        overflow: 'hidden',
        position: 'relative',
    },
    containerDoContainerImagem: {
        alignItems: 'center',
    },
    infosecao:{
        padding: 15,
        marginBottom: 10,
    },

    ScrollView: {
        backgroundColor: '#D4D4D4',
    },
});

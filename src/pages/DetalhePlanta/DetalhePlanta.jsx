import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, Image, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function DetalhePlanta({ route }) {
    const navigation = useNavigation(); 

    const { planta } = route.params;
    const [detalhesPlanta, setDetalhesPlanta] = useState([]);

    const imagensPlantas = {
        batata: require('@/assets/images/batata.png'),
        couve: require('@/assets/images/couve.png'),
        'couve-flor': require('@/assets/images/couveflor.png'),
        tomate: require('@/assets/images/tomate.png'),
      };

    useEffect(() => {
        axios.post('http://192.168.0.108:8080/buscarDetalhesPlanta', { planta: planta.nome })
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

    const handleComecarCultivo = (planta) => {
        axios.post('http://192.168.0.108:8080/inserirNovoCultivo', { planta: planta.nome })
        .then((response) => {
            // setDetalhesPlanta(response.data[0]);
            navigation.navigate('CultivoAtivo', { planta });
        }) 
    };

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

                <View style={styles.infosecaocultivo}>
                    <Text style={styles.tituloinfo}>Tempo de Cultivo</Text>
                    <Text style={styles.info}>{detalhesPlanta.tempo_cultivo}</Text>
                </View>
                
                <View style={styles.infosecaocultivo}>
                    <Text style={styles.tituloinfo}>Modo de cultivo</Text>
                    <Text style={styles.info}>{detalhesPlanta.modo_cultivo}</Text>
                </View>

                <View style={styles.infosecaocultivo}>
                    <Text style={styles.tituloinfo}>Clima ideal</Text>
                    <Text style={styles.info}>{detalhesPlanta.clima_ideal}</Text>
                </View>

                <View style={styles.infosecaocultivo}>
                    <Text style={styles.tituloinfo}>Tipo de solo</Text>
                    <Text style={styles.info}>{detalhesPlanta.tipo_solo}</Text>
                </View>

                <TouchableOpacity style={styles.botaoComecarPlantacao} onPress={() => handleComecarCultivo(planta)}>
                    <Text style={styles.textoComecarPlantacao}>Começar plantação</Text>
                </TouchableOpacity>
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

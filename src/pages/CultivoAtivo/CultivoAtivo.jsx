import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { URL } from '@env';
import { useUser } from '../../context/UserContext'; 

export default function DetalheCultivo({ route }) {
    const { planta } = route.params;
    const { user } = useUser(); 
    const navigation = useNavigation(); 

    const { cultivo } = route.params;
    const [detalhesCultivo, setDetalhesCultivo] = useState(null);

    
    const imagensPlantas = {
        batata: require('@/assets/images/batata.png'),
        couve: require('@/assets/images/couve.png'),
        'couve-flor': require('@/assets/images/couveflor.png'),
        tomate: require('@/assets/images/tomate.png'),
      };

    useEffect(() => {
        axios.post(`http://${URL}:8080/buscarDetalhesCultivo`, { planta: planta.id_cultivo })
            .then((response) => {
                console.log(response.data)
                setDetalhesCultivo(response.data[0]);
            })
    }, [planta]);

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
                        <Image source={imagensPlantas[(planta.nome_planta).toLowerCase()]} style={styles.imagem}/>
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

                <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoVoltar}>Voltar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#D4D4D4',
        paddingTop: 25,
        paddingBottom: 70,
    },
    nome: {
        fontSize: 50,
        marginBottom: 10,
        fontFamily: 'FibraOneBold'
    },
    botaoVoltar: {
        backgroundColor: '#5cad39',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 15,
        width: '80%',
    },
    textoVoltar: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'FibraOneBold',
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
        paddingHorizontal: 20,
        backgroundColor: '#E4E7E4',
        width: '95%'
    },
    containerNome: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

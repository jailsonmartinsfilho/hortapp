import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, View, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ItemPesquisa from '../../components/ItemPesquisa';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '@env';

export default function Search() {
    const navigation = useNavigation();

    const [textoPesquisa, setTextoPesquisa] = useState('');
    const [todasPlantas, setTodasPlantas] = useState([]);
    const [plantasFiltradas, setPlantasFiltradas] = useState([]);

    useEffect(() => {
        axios.post(`http://${URL}/buscarTodasPlantas`)
            .then((response) => {
                console.log(response.data)
                setTodasPlantas(response.data);
                setPlantasFiltradas(response.data);
            })
            .catch((error) => {
                console.log('Erro na requisição:', error);
            });
    }, []);

    const handlePesquisa = (textoPesquisaPassado) => {
        setTextoPesquisa(textoPesquisaPassado);
        const plantasFiltradas = todasPlantas.filter((planta) =>
            planta.nome.toLowerCase().startsWith(textoPesquisaPassado.toLowerCase())
        );
        setPlantasFiltradas(plantasFiltradas);
    };

    const handleSelectPlanta = (planta) => {
        navigation.navigate('DetalhePlanta', { planta });
    };

    if (!plantasFiltradas) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.lupaSearchBar}>
                <TextInput style={styles.searchBar} placeholder="Qual será sua nova plantação?" value={textoPesquisa} onChangeText={handlePesquisa} />
                <View style={styles.containerLupa}>
                    <Ionicons name='search-outline' size={25} color='white' />
                </View>
            </View>

            <ScrollView style={styles.ScrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.gridContainer}>
                    {plantasFiltradas.map((planta, index) => (
                        <TouchableOpacity key={index} onPress={() => handleSelectPlanta(planta)} style={styles.gridItem}>
                            <ItemPesquisa nome={planta.nome} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        marginTop: 30,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#D4D4D4',
        paddingBottom: 70,
    },
    containerLupa: {
        backgroundColor: '#939793',
        width: '100%',
        height: '100%',
        paddingTop: 12,
        paddingLeft: 17,
    },
    lupaSearchBar: {
        backgroundColor: '#ECECEC',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        paddingLeft: 15,
        borderRadius: 200,
        overflow: 'hidden',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    searchBar: {
        backgroundColor: '#ECECEC',
        borderRadius: 200,
        height: 50,
        paddingHorizontal: 10,
        width: 240
    },
    ScrollView: {
        flex: 1,
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridContainer: {
        marginTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        width: '33%',
        marginBottom: 20,
    },
});

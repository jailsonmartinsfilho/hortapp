import { URL } from '@env';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ItemPesquisa from '../../components/ItemPesquisa';


export default function Search() {
    const navigation = useNavigation();

    const [textoPesquisa, setTextoPesquisa] = useState('');
    const [plantasFiltradas, setPlantasFiltradas] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            axios.post(`http://${URL}/buscarTodasPlantas`)
                .then((response) => {
                    console.log(response.data)
                    setPlantasFiltradas(response.data);
                });
        }, [])
    );

    const handlePesquisa = (textoPesquisaPassado) => {
        setTextoPesquisa(textoPesquisaPassado);
        const plantasFiltradas = plantasFiltradass.filter((planta) =>
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
                        <Text style={styles.textoSuasPlantacoesAtivas}>Pesquisar uma nova plantação</Text>

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
    SafeAreaView: { flex: 1, marginTop: 30, paddingRight: 20, paddingLeft: 20, backgroundColor: '#fff', paddingBottom: 70 },
    containerLupa: { backgroundColor: '#939793', width: '40%', height: '100%', paddingTop: 12, paddingLeft: 20 },
    lupaSearchBar: { backgroundColor: '#ECECEC', flexDirection: 'row', alignItems: 'center', borderColor: 'gray', paddingLeft: 5, borderRadius: 200, overflow: 'hidden', marginTop: 20, position: 'relative' },
    searchBar: { backgroundColor: '#ECECEC', borderRadius: 200, height: 50, paddingHorizontal: 10, width: 280 },
    ScrollView: { flex: 1 },
    contentContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    gridContainer: { marginTop: 20, paddingLeft: 20, flexDirection: 'row', flexWrap: 'wrap' },
    gridItem: { width: '33%', marginBottom: 20 },
    textoSuasPlantacoesAtivas: { fontSize: 29, fontFamily: 'FibraOneBold', color: '#5cad39', marginBottom: 10, marginTop: 20 },
});

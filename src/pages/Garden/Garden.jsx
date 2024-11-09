import { URL } from '@env';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ItemPesquisa from '../../components/ItemPesquisa';

export default function Garden() {
    const navigation = useNavigation();
    const [plantasFiltradas, setPlantasFiltradas] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            console.log('buscou')
            axios.post(`http://${URL}/buscarTodosCultivos`)
                .then((response) => {
                    setPlantasFiltradas(response.data);
                });
        }, [])
    );

    const handleSelectPlanta = (planta) => {
        navigation.navigate('DetalhesCultivo', { planta });
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
            <Text style={styles.textoSuasPlantacoesAtivas} >Suas plantações ativas</Text>
            <ScrollView style={styles.ScrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.gridContainer}>
                    {plantasFiltradas.map((planta, index) => (
                        <TouchableOpacity key={index} onPress={() => handleSelectPlanta(planta)} style={styles.gridItem}>
                            <ItemPesquisa nome={planta.nome_planta} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: { flex: 1, marginTop: 30, paddingRight: 20, paddingLeft: 20, backgroundColor: '#fff', paddingBottom: 70 },
    containerLupa: { backgroundColor: '#939793', width: '10%', height: '100%', paddingTop: 12, paddingLeft: 17 },
    lupaSearchBar: { backgroundColor: '#ECECEC', flexDirection: 'row', alignItems: 'center', borderColor: 'gray', paddingLeft: 5, borderRadius: 200, overflow: 'hidden', marginTop: 20, position: 'relative' },
    searchBar: { backgroundColor: '#ECECEC', borderRadius: 200, height: 50, paddingHorizontal: 10, width: 240 },
    ScrollView: { flex: 1 },
    contentContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    gridContainer: { marginTop: 20, paddingLeft: 20, flexDirection: 'row', flexWrap: 'wrap' },
    gridItem: { width: 100, marginBottom: 20, },
    textoSuasPlantacoesAtivas: { fontSize: 29, fontFamily: 'FibraOneBold', color: '#5cad39', marginBottom: 10, marginTop: 20 },
    
});
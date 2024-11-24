import { URL } from '@env';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ItemJardim from '../../components/ItemJardim';
import { LinearGradient } from 'expo-linear-gradient';


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
        <LinearGradient colors={['#d9fff4', '#ffffff']} locations={[0, 0.4]} style={styles.SafeAreaView}>
            <Text style={styles.textoSuasPlantacoesAtivas}>Minhas plantações</Text>
            <ScrollView style={styles.ScrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.gridContainer}>
                    {plantasFiltradas.map((planta, index) => (
                        <TouchableOpacity key={index} onPress={() => handleSelectPlanta(planta)} style={styles.gridItem}>
                            <ItemJardim nome={planta.nome_planta} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: { flex: 1, marginTop: 30, paddingRight: 15, paddingLeft: 15, backgroundColor: '#fff', paddingBottom: 70 },
    containerLupa: { backgroundColor: '#939793', width: '10%', height: '100%', paddingTop: 12, paddingLeft: 17 },
    lupaSearchBar: { backgroundColor: '#ECECEC', flexDirection: 'row', alignItems: 'center', borderColor: 'gray', paddingLeft: 5, borderRadius: 200, overflow: 'hidden', marginTop: 20, position: 'relative' },
    searchBar: { backgroundColor: '#ECECEC', borderRadius: 200, height: 50, paddingHorizontal: 10, width: 240 },
    ScrollView: { flex: 1 },
    contentContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    gridContainer: { marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'},
    gridItem: {width: '100%', marginBottom: 20, justifyContent: 'center', alignItems: 'center', zIndex: 1, borderRadius: 20},
    textoSuasPlantacoesAtivas: { fontSize: 26, color: '#0f4d2e', marginBottom: 15, marginTop: 20, fontFamily: 'FibraOneBold'},
});
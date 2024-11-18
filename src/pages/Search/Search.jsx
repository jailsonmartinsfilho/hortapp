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
    const [todasPlantas, setTodasPlantas] = useState([]); // Novo estado
    const [plantasFiltradas, setPlantasFiltradas] = useState([]);
    
    useFocusEffect(
        React.useCallback(() => {
            axios.post(`http://${URL}/buscarTodasPlantas`)
                .then((response) => {
                    console.log(response.data);
                    setTodasPlantas(response.data); // Armazena a lista original
                    setPlantasFiltradas(response.data); // Exibe todas inicialmente
                })
                .catch((error) => {
                    console.error("Erro ao buscar plantas:", error);
                });
        }, [])
    );
    
    const handlePesquisa = (textoPesquisaPassado) => {
        setTextoPesquisa(textoPesquisaPassado);
        const plantasFiltradas = todasPlantas.filter((planta) => // Usa todasPlantas
            planta.nome.toLowerCase().startsWith(textoPesquisaPassado.toLowerCase())
        );
        setPlantasFiltradas(plantasFiltradas);
    };
    
    const handleSelectPlanta = (planta) => {
        navigation.navigate('DetalhePlanta', { planta });
    };    

    return (
        <SafeAreaView style={styles.SafeAreaView}>
                        <Text style={styles.textoPesquisarUmaNovaPlantacao}>Pesquisar uma nova plantação</Text>

            <View style={styles.barraPesquisa}>
                <Ionicons name='search-outline' size={25} color='gray' />
                <TextInput style={styles.textoQualSeraSuaNovaPlantacao} placeholder="Qual será sua nova plantação?" value={textoPesquisa} onChangeText={handlePesquisa} />
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
    barraPesquisa: { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECECEC', borderRadius: 5, height: 50, paddingLeft: 20, width: '100%', overflow: 'hidden', paddingRight: 50 },
    textoQualSeraSuaNovaPlantacao: {fontSize: 12, marginLeft: 5, fontFamily: 'FibraOneBold', width: '100%'},
    ScrollView: { flex: 1 },
    contentContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    gridContainer: { marginTop: 20, flexDirection: 'row', flexWrap: 'wrap' },
    gridItem: { width: '100%', marginBottom: 8, elevation: 2},
    textoPesquisarUmaNovaPlantacao: { fontSize: 20, color: '#5cad39', marginBottom: 15, marginTop: 20, fontFamily: 'FibraOneBold'},
});

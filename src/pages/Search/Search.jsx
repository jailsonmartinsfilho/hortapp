import { URL } from '@env';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ItemPesquisa from '../../components/ItemPesquisa';
import { LinearGradient } from 'expo-linear-gradient';

export default function Search() {
    const navigation = useNavigation();
    
    const [textoPesquisa, setTextoPesquisa] = useState('');
    const [todasPlantas, setTodasPlantas] = useState([]); 
    const [plantasFiltradas, setPlantasFiltradas] = useState([]);
    
    useFocusEffect(
        React.useCallback(() => {
            axios.post(`http://${URL}/buscarTodasPlantas`)
                .then((response) => {
                    console.log(response.data);
                    setTodasPlantas(response.data); 
                    setPlantasFiltradas(response.data); 
                })
                .catch((error) => {
                    console.error("Erro ao buscar plantas:", error);
                });
        }, [])
    );
    
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

    return (
        <LinearGradient colors={['#d9fff4', '#ffffff']} locations={[0, 0.4]} style={styles.SafeAreaView}>
                        <Text style={styles.textoPesquisarUmaNovaPlantacao}>Encontrar nova plantação</Text>

            <View style={styles.barraPesquisa}>
                <TextInput style={styles.textoQualSeraSuaNovaPlantacao} placeholder="Qual será sua nova plantação?" value={textoPesquisa} onChangeText={handlePesquisa} />
                <View style={styles.circuloLupa}><Ionicons name='search-outline' size={17} color='white' /></View>
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
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: { flex: 1, marginTop: 30, paddingRight: 15, paddingLeft: 15, backgroundColor: '#fff', paddingBottom: 70 },
    containerLupa: { backgroundColor: '#939793', width: '40%', height: '100%', paddingTop: 12, paddingLeft: 20 },
    barraPesquisa: { display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', elevation: 3, borderRadius: 20, height: 45, paddingLeft: 20, width: '100%', overflow: 'hidden', paddingRight: 55 },
    textoQualSeraSuaNovaPlantacao: {fontSize: 14, marginLeft: 5, fontFamily: 'FibraOneMedium', width: '100%',  marginRight: 10,},
    ScrollView: { flex: 1 },
    contentContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    gridContainer: { marginTop: 20, flexDirection: 'row', flexWrap: 'wrap' },
    gridItem: { width: '100%', marginBottom: 8, elevation: 2},
    textoPesquisarUmaNovaPlantacao: { fontSize: 26, color: '#0f4d2e', marginBottom: 15, marginTop: 20, fontFamily: 'FibraOneBold'},
    circuloLupa: { backgroundColor: '#21ce98', borderRadius: 50, padding: 10}
});

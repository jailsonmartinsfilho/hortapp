import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, TextInput } from 'react-native';
import axios from 'axios';


import ItemPesquisa from '../../components/ItemPesquisa';

export default function Search() {
    const [textoPesquisa, setTextoPesquisa] = useState('');
    const [todasPlantas, setTodasPlantas] = useState([]);
    const [plantasFiltradas, setPlantasFiltradas] = useState([]);

    useEffect(() => {
        axios.post('http://192.168.0.108:8080/buscarTodasPlantas')
            .then((response) => {
                setTodasPlantas(response.data);
                setPlantasFiltradas(response.data);
            })
    }, []);

    const handlePesquisa = (textoPesquisaPassado) => {
        setTextoPesquisa(textoPesquisaPassado);
        const plantasFiltradas = todasPlantas.filter((planta) =>
            planta.nome.toLowerCase().startsWith(textoPesquisaPassado.toLowerCase())
        );
        setPlantasFiltradas(plantasFiltradas); 
    };

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <TextInput style={styles.searchBar} placeholder="Qual será sua nova plantação?" value={textoPesquisa} onChangeText={handlePesquisa} />
            <ScrollView style={styles.ScrollView}>
                {plantasFiltradas.map((planta, index) => (
                    <ItemPesquisa key={index} nome={planta.nome} />
                ))}
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
    },
    searchBar: {
        backgroundColor: '#fff',
        height: 60,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingLeft: 20
    },
    ScrollView: {
        padding: 20,
    },
    containerPlanta: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 25,
        marginTop: 10,
    }
});

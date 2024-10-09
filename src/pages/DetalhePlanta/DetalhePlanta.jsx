import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetalhePlanta({ route }) {
    const { planta } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.nome}>{planta.nome}</Text>
            <Text>Informações adicionais sobre a planta podem ser exibidas aqui.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    nome: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

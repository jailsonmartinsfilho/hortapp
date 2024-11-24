import { URL } from '@env';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { useUser } from '../../context/UserContext';

export default function DetalhePlanta({ route }) {
    const navigation = useNavigation();

    const [scrollY] = useState(new Animated.Value(0));

    const { user } = useUser();
    const { planta } = route.params;
    const [detalhesPlanta, setDetalhesPlanta] = useState([]);

    const imagensPlantas = {
        batata: require('@/assets/images/batata.png'),
        couve: require('@/assets/images/couve.png'),
        'couve-flor': require('@/assets/images/couveflor.png'),
        tomate: require('@/assets/images/tomate.png'),
    };

    useFocusEffect(
        React.useCallback(() => {
            console.log('wa')
            axios.post(`http://${URL}/buscarDetalhesPlanta`, { planta: planta.nome })
                .then((response) => {
                    setDetalhesPlanta(response.data[0]);
                })
        }, [planta])
    );

    if (!detalhesPlanta) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    const handleComecarCultivo = (planta) => {
        axios.post(`http://${URL}/inserirNovoCultivo`, { planta: planta.nome, email: user.email })
            .then((response) => {
                navigation.navigate('Garden');
            })
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.containerImagem, { transform: [{ translateY: scrollY.interpolate({ inputRange: [0, 200], outputRange: [0, -100], extrapolate: 'clamp', }), }], easing: Easing.inOut(Easing.quad) }]}>
                <Image source={imagensPlantas[(planta.nome).toLowerCase()]} style={styles.imagem} />
            </Animated.View>

            <Animated.ScrollView contentContainerStyle={styles.scrollViewContent} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })} scrollEventThrottle={13}>
                <View style={styles.overlayContainer}>
                    <View style={styles.infosecaocultivo}>
                        <Text style={styles.tituloinfo}>Tempo de Cultivo</Text>
                        <Text style={styles.info}>{detalhesPlanta.tempo_cultivo}</Text>
                    </View>

                    <TouchableOpacity style={styles.botaoComecarPlantacao} onPress={() => handleComecarCultivo(planta)}>
                        <Text style={styles.textoComecarPlantacao}>Começar plantação</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: '#ffffff',
        paddingBottom: 70,
    },
    botaoComecarPlantacao: {
        backgroundColor: '#5cad39',
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: '#66B142',
        height: 55,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 15,
        elevation: 2,
        marginTop: 20,
        marginBottom: 25,
        width: '80%',
    },
    textoComecarPlantacao: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'FibraOneBold'
    },
    tituloinfo: {
        fontSize: 29,
        marginBottom: 5,
        fontFamily: 'FibraOneBold'
    },
    info: {
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'FibraOneBold'
    },
    infosecaocultivo: {
        fontFamily: 'FibraOneBold',
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 25,
        backgroundColor: '#ffffff',
        height: 700,
        width: '100%',
    },
    imagem: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        resizeMode: 'cover',
    },
    containerImagem: {
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        width: '100%',
        height: 250,
        backgroundColor: '#B6BDAF',
        elevation: 3,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
    },
    overlayContainer: {
        zIndex: 0,
        width: '100%'
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 230,
    },
});
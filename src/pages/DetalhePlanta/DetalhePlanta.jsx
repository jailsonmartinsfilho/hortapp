import { URL } from '@env';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { useUser } from '../../context/UserContext';

export default function DetalhePlanta({ route }) {
    const navigation = useNavigation();
    const [scrollY] = useState(new Animated.Value(0));

    const { user } = useUser();
    const { planta } = route.params;
    const [detalhesPlanta, setDetalhesPlanta] = useState({});

    const imagensPlantas = {
        batata: require('@/assets/images/batata.png'),
        couve: require('@/assets/images/couve.png'),
        'couve-flor': require('@/assets/images/couveflor.png'),
        tomate: require('@/assets/images/tomate.png'),
        morango: require('@/assets/images/morango.png'),
        milho: require('@/assets/images/milho.png'),
        'hortelã': require('@/assets/images/hortela.png'),
        cebolinha: require('@/assets/images/cebolinha.png'),
        salsa: require('@/assets/images/salsa.png'),
        'manjericão': require('@/assets/images/manjericao.png'),
        'pimenta vermelha': require('@/assets/images/pimentavermelha.png'),
        alface: require('@/assets/images/alface.png'),
        coentro: require('@/assets/images/coentro.png'),
    };

    useFocusEffect(
        React.useCallback(() => {
            axios.post(`http://${URL}/buscarDetalhesPlanta`, { planta: planta.nome })
                .then((response) => {
                    setDetalhesPlanta(response.data[0]);
                });
        }, [])
    );

    if (!detalhesPlanta) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    const handleComecarCultivo = (detalhesPlanta) => {
        const cultivo = {
            email_usuario: user.email,
            nome_planta: detalhesPlanta.nome,
            nome_cientifico: detalhesPlanta.nome_cientifico,
            tempo_cultivo: detalhesPlanta.tempo_cultivo,
            data_inicio: new Date(),// Data atual no formato YYYY-MM-DD
            data_estimativa_colheita: new Date(new Date().setDate(new Date().getDate() + detalhesPlanta.tempo_cultivo)),
            progresso_cultivo: 0,
            quantidade_rega: detalhesPlanta.quantidade_rega,
            etiqueta_sol: detalhesPlanta.etiqueta_sol,
            etiqueta_dificuldade: detalhesPlanta.etiqueta_dificuldade,
            etiqueta_agua: detalhesPlanta.etiqueta_agua,
            etiqueta_tempo: detalhesPlanta.etiqueta_tempo,
        };

        axios.post(`http://${URL}/inserirNovoCultivo`, cultivo)
            .then((response) => {
                console.log('Cultivo criado com sucesso:', response.data);
                navigation.navigate('Garden');
            })
            .catch((error) => {
                console.error('Erro ao criar cultivo:', error);
            });
    };

    const MIN_TEMP = -10;
    const MAX_TEMP = 50;

    const temperaturaIdeal = detalhesPlanta?.temperatura_ideal || '0 - 0';
    const [minIdeal, maxIdeal] = temperaturaIdeal.split(' - ').map((temp) => parseInt(temp, 10));


    const calcularPosicao = (minIdeal) => { return ((minIdeal - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100 + '%'; }

    const calcularLargura = (minIdeal, maxIdeal) => {
        const largura = ((maxIdeal - minIdeal) / (MAX_TEMP - MIN_TEMP)) * 100;
        return largura + '%';
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.containerImagem, { transform: [{ translateY: scrollY.interpolate({ inputRange: [0, 200], outputRange: [0, -100], extrapolate: 'clamp', }), }], easing: Easing.inOut(Easing.quad) }]}>
                <Image source={imagensPlantas[(planta.nome).toLowerCase()]} style={styles.imagem} />
            </Animated.View>

            <Animated.ScrollView contentContainerStyle={styles.scrollViewContent} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })} scrollEventThrottle={13}>
                <View style={styles.overlayContainer}>

                    <View style={styles.containerSecoesInfo}>
                        <View style={styles.cabecalhoInfo}>
                            <Text style={styles.tituloSecao}>{detalhesPlanta.nome}</Text>
                            <Text style={styles.infoSecao}>Nomes comuns: {detalhesPlanta.nomes_comuns}</Text>
                            <Text style={styles.infoSecao}>Nome científico: {detalhesPlanta.nome_cientifico}</Text>

                            <View style={styles.secaoEtiquetas}>
                                <View style={styles.etiqueta}><MaterialCommunityIcons name="white-balance-sunny" size={27} color="#f7ca36" /><Text style={styles.infoEtiqueta}>{detalhesPlanta.etiqueta_sol}</Text></View>
                                <View style={styles.etiqueta}><Entypo name="bar-graph" size={21} color="#1fcc98" /><Text style={styles.infoEtiqueta}>{detalhesPlanta.etiqueta_dificuldade}</Text></View>
                                <View style={styles.etiqueta}><Ionicons name='water' size={23} color='#41ccea' /><Text style={styles.infoEtiqueta}>{detalhesPlanta.etiqueta_agua}</Text></View>
                                <View style={styles.etiqueta}><FontAwesome6 name="hourglass-end" size={20} color="#7946a3" style={{ marginLeft: 5 }} /><Text style={styles.infoEtiqueta}>{detalhesPlanta.etiqueta_tempo}</Text></View>
                            </View>
                        </View>

                        <View style={styles.secaoInfo}>
                            <Text style={styles.tituloSecao}>Solo</Text>

                            <View style={styles.containerCirculoInfoSecao}>
                                <View style={[styles.circuloSecao, { backgroundColor: '#fce4d9' }]}>
                                    <MaterialCommunityIcons name="seed" size={30} color="#e3916f" style={{ marginLeft: 0, marginBottom: 0 }} />
                                </View>
                                <Text style={styles.infoSecao}>{detalhesPlanta.tipo_solo}</Text>
                            </View>
                        </View>

                        <View style={styles.secaoInfo}>
                            <Text style={styles.tituloSecao}>Rega</Text>

                            <View style={styles.containerCirculoInfoSecao}>
                                <View style={styles.circuloSecao}>
                                    <MaterialCommunityIcons name="watering-can" size={34} color="#49cdf0" style={{ marginLeft: 4, marginBottom: 2 }} />
                                </View>
                                <Text style={styles.infoSecao}>{detalhesPlanta.quantidade_rega}</Text>
                            </View>
                        </View>

                        <View style={styles.secaoInfo}>
                            <Text style={styles.tituloSecao}>Fertilização</Text>

                            <View style={styles.containerCirculoInfoSecao}>
                                <View style={[styles.circuloSecao, { backgroundColor: '#dcfaeb' }]}>
                                    <MaterialCommunityIcons name="sprout" size={30} color="#4fd190" style={{ marginLeft: 0, marginBottom: 2 }} />
                                </View>

                                <View style={styles.containerDoisTextos}>
                                    <Text style={styles.infoSecao}>{detalhesPlanta.quantidade_fertilizacao_liquida}</Text>
                                    <Text style={styles.infoSecao}>{detalhesPlanta.quantidade_fertilizacao_lenta}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.secaoInfo}>
                            <Text style={styles.tituloSecao}>Poda</Text>

                            <View style={styles.containerCirculoInfoSecao}>
                                <View style={styles.circuloSecao}>
                                    <Entypo name="scissors" size={28} color="#1fcc98" />
                                </View>
                                <Text style={styles.infoSecao}>{detalhesPlanta.quantidade_poda}</Text>
                            </View>
                        </View>

                        <View style={styles.secaoInfo}>
                            <Text style={styles.tituloSecao}>Temperatura</Text>
                            <Text style={styles.infoSecao}>Temperatura ideal</Text>

                            <View style={styles.containerTemperatura}>
                                <View style={styles.extremosTemperatura}>
                                    <Text style={styles.extremoTexto}>{MIN_TEMP}°C</Text>
                                    <Text style={styles.extremoTexto}>{MAX_TEMP}°C</Text>
                                </View>

                                <View style={styles.barraTemperatura}>
                                    <View style={[styles.zonaIdeal, { left: calcularPosicao(minIdeal), width: calcularLargura(minIdeal, maxIdeal) }]}>
                                        <Text style={styles.intervaloTexto}>{detalhesPlanta.temperatura_ideal}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <View style={styles.secaoReportar}>
                            <Text style={styles.tituloReportar}>Há algum erro nessa informação?</Text>
                            <Text style={styles.subTituloReportar}>Caso algo pareça incorreto, por favor reporte para os desenvolvedores.</Text>

                            <TouchableOpacity style={styles.botaoReportarErro} onPress={() => handleComecarCultivo(planta)}>
                                <Text style={styles.textoReportarErro}>Reportar erro</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.botaoComecarPlantacao} onPress={() => handleComecarCultivo(detalhesPlanta)}>
                            <Text style={styles.textoComecarPlantacao}>+ Adicionar plantação</Text>
                        </TouchableOpacity>
                    </View>
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
    imagem: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        resizeMode: 'cover',
    },
    overlayContainer: {
        zIndex: 0,
        width: '100%'
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 230,
    },
    containerSecoesInfo: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'FibraOneBold',
        borderRadius: 20,
        backgroundColor: '#ecf6f1',
        width: '100%',
    },
    secaoInfo: {
        backgroundColor: '#ffffff',
        padding: 17,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 1,
        width: '90%'
    },
    circuloSecao: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#e5f7ff',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    containerCirculoInfoSecao: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    containerDoisTextos: {
        display: 'flex',
        flexDirection: 'column'
    },
    tituloSecao: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'FibraOneBold'
    },
    infoSecao: {
        fontSize: 16,
        fontFamily: 'FibraOneMedium',
    },
    secaoReportar: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffffff',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 15,
        elevation: 1,
        width: '90%'
    },
    tituloReportar: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'FibraOneBold'
    },
    subTituloReportar: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'FibraOneMedium',
        marginBottom: 7
    },
    botaoReportarErro: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#1fcc98',
        backgroundColor: '#ffffff',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 15,
        elevation: 2,
        marginTop: 20,
        marginBottom: 25,
        width: '70%',
    },
    textoReportarErro: {
        color: '#1fcc98',
        fontSize: 17,
        fontFamily: 'FibraOneMedium'
    },
    secaoEtiquetas: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        paddingTop: 13,
        height: 'auto',
        gap: 10
    },
    etiqueta: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5faf9',
        height: 45,
        width: 158,
        borderRadius: 7,
        marginBottom: 5
    },
    infoEtiqueta: {
        fontSize: 16,
        fontFamily: 'FibraOneMedium',
        marginLeft: 7
    },
    cabecalhoInfo: {
        backgroundColor: '#ffffff',
        padding: 17,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 1,
        width: '100%'
    },
    containerTemperatura: {
        marginTop: 20,
        alignItems: 'center',
    },
    extremosTemperatura: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 4,
    },
    extremoTexto: {
        fontSize: 15,
        color: '#666',
        fontFamily: 'FibraOneMedium'
    },
    barraTemperatura: {
        position: 'relative',
        height: 30,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 50,
        overflow: 'hidden',
    },
    zonaIdeal: {
        position: 'absolute',
        height: '100%',
        backgroundColor: '#49cdf0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    intervaloTexto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
    botaoComecarPlantacao: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#1fcc98',
        height: 55,
        borderRadius: 50,
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
    }
});
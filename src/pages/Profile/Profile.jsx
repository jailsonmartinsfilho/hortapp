import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../context/UserContext';

export default function Profile({ navigation }) {
    const { user } = useUser();
    const [amigos, setAmigos] = useState([]);

    // Simulação de requisição para obter amigos
    useEffect(() => {
        setAmigos([
            { id: '1', nome: 'Carlos Silva' },
            { id: '2', nome: 'Ana Oliveira' },
            { id: '3', nome: 'Marcos Souza' }
        ]);
    }, []);

    // Função para navegar para o perfil do amigo
    const visualizarPerfilAmigo = (amigo) => {
        navigation.navigate('PerfilAmigo', { amigo });
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.profileIconContainer}>
                        <Image source={require('@/assets/icon.png')} style={styles.profileIcon} />
                        <Text style={styles.userName}>{user.nome}</Text>
                    </View>

                    <View style={styles.achievementsContainer}>
                        <Text style={styles.sectionTitle}>Cultivos já plantados</Text>
                        {user.conquistas && user.conquistas.length > 0 ? (
                            user.conquistas.map((conquista, index) => (
                                <View key={index} style={styles.achievementItem}>
                                    <Icon name="trophy" size={24} color="#FFD700" />
                                    <Text style={styles.achievementText}>{conquista}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noAchievements}>Nenhum cultivo ainda.</Text>
                        )}
                    </View>

                    <View style={styles.achievementsContainer}>
                        <Text style={styles.sectionTitle}>Cultivos ativos</Text>
                        {user.conquistas && user.conquistas.length > 0 ? (
                            user.conquistas.map((conquista, index) => (
                                <View key={index} style={styles.achievementItem}>
                                    <Icon name="trophy" size={24} color="#FFD700" />
                                    <Text style={styles.achievementText}>{conquista}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noAchievements}>Nenhum cultivo ativo por enquanto.</Text>
                        )}
                    </View>



                    <View style={styles.achievementsContainer}>
                        <Text style={styles.sectionTitle}>Conquistas</Text>
                        {user.conquistas && user.conquistas.length > 0 ? (
                            user.conquistas.map((conquista, index) => (
                                <View key={index} style={styles.achievementItem}>
                                    <Icon name="trophy" size={24} color="#FFD700" />
                                    <Text style={styles.achievementText}>{conquista}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noAchievements}>Nenhuma conquista ainda.</Text>
                        )}
                    </View>

                    <View style={styles.friendsContainer}>
                        <Text style={styles.sectionTitle}>
                            Amigos ({amigos.length})
                        </Text>
                        <FlatList
                            data={amigos}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => visualizarPerfilAmigo(item)} style={styles.amigoContainer}>
                                    <Text style={styles.amigoNome}>{item.nome}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    <View style={styles.friendsContainer}>
                        <Text style={styles.noAchievements}>
                            Data de cadastro: {'08/11/2024'}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Logout')}>
                        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: { flex: 1, backgroundColor: '#fff' },
    scrollContainer: { paddingHorizontal: 30, paddingVertical: 20 },
    container: { backgroundColor: '#fff', alignItems: 'center', paddingHorizontal: 0 },
    profileIconContainer: { alignItems: 'center', marginBottom: 20, marginTop: 30 },
    profileIcon: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#ccc' },
    userName: { fontSize: 22, fontFamily: 'FibraOneBold', color: '#333', marginTop: 10 },
    userInfoContainer: { alignItems: 'flex-start', width: '100%', paddingHorizontal: 0, marginBottom: 30 },
    text: { fontSize: 18, color: '#333', marginVertical: 5, fontFamily: 'FibraOneBold' },
    achievementsContainer: { width: '100%', paddingHorizontal: 0, marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontFamily: 'FibraOneBold', color: '#5cad39', marginBottom: 10 },
    achievementItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    achievementText: { fontSize: 16, color: '#333', marginLeft: 10, fontFamily: 'FibraOneBold' },
    noAchievements: { fontSize: 16, color: 'gray', fontFamily: 'FibraOneBold' },
    friendsContainer: { width: '100%', paddingHorizontal: 0, marginBottom: 20 },
    amigoContainer: { flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingVertical: 20, borderWidth: 1, borderColor: 'gray', marginTop: 15, borderRadius: 10 },
    amigoNome: { fontSize: 18, marginLeft: 10, fontFamily: 'FibraOneBold', fontSize: 18, color: 'gray'},
    logoutButton: {
        backgroundColor: '#5cad39', borderBottomWidth: 5, borderRightWidth: 5, borderColor: '#66B142',
        height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15,
        elevation: 2
    },
    logoutButtonText: { color: '#fff', fontSize: 20, fontFamily: 'FibraOneBold' },
});
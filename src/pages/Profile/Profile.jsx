import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../context/UserContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile({ navigation }) {
    const { user } = useUser();

    const [amigos, setAmigos] = useState([{ id: '1', nome: 'Jailson Martins' }]);

    return (
        <LinearGradient colors={['#d9fff4', '#ffffff']} locations={[0, 0.4]} style={styles.SafeAreaView}>
            <View style={styles.profileIconContainer}>
                <Image source={require('@/assets/icon.png')} style={styles.profileIcon} />
                <Text style={styles.textoNomeDoUsuario}>{user.nome}</Text>
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
                <FlatList data={amigos} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                    <TouchableOpacity style={styles.containerAmigo}>
                        <Text style={styles.textAmigoNome}>{item.nome}</Text>
                    </TouchableOpacity>)}
                />
            </View>

            <TouchableOpacity style={styles.botaoSairDaConta} onPress={() => console.log('Logout')}>
                <Text style={styles.textoSairDaConta}>Sair da Conta</Text>
            </TouchableOpacity>
        </LinearGradient >
    );
}

const styles = StyleSheet.create({
    SafeAreaView: { flex: 1, marginTop: 30, paddingRight: 15, paddingLeft: 15, paddingBottom: 70 },
    profileIconContainer: { alignItems: 'center', marginBottom: 20, marginTop: 30 },
    profileIcon: { width: 150, height: 150, borderRadius: 100, borderWidth: 2, borderColor: '#202420' },
    textoNomeDoUsuario: { fontSize: 30, fontFamily: 'FibraOneMedium', color: '#202420', marginTop: 10 },
    userInfoContainer: { alignItems: 'flex-start', width: '100%', paddingHorizontal: 0, marginBottom: 30 },
    achievementsContainer: { width: '100%', paddingHorizontal: 0, marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontFamily: 'FibraOneBold', color: '#0f4d2e', marginBottom: 10 },
    achievementItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    noAchievements: { fontSize: 16, color: 'gray', fontFamily: 'FibraOneMedium' },
    friendsContainer: { width: '100%', paddingHorizontal: 0, marginBottom: 20 },
    containerAmigo: { flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingVertical: 20, borderWidth: 1, borderColor: '#0f4d2e', marginTop: 15, borderRadius: 10 },
    textAmigoNome: { fontSize: 18, marginLeft: 10, fontFamily: 'FibraOneMedium', fontSize: 15, color: '#0f4d2e' },
    botaoSairDaConta: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: '#1fcc98', height: 55, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10, paddingHorizontal: 15, elevation: 2, marginLeft: 35, marginBottom: 25, width: '80%'},
    textoSairDaConta: { color: '#fff', fontSize: 20, fontFamily: 'FibraOneBold'},
});
import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useUser } from '../../context/UserContext'; 

export default function Profile() {
    const { user } = useUser(); 
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    {user ? (
                        <>
                            <Text style={styles.text}>Nome: {user.nome}</Text>
                            <Text style={styles.text}>Email: {user.email}</Text>
                        </>
                    ) : (
                        <Text style={styles.text}>Nenhum usuário logado.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 50,
        marginTop: 20,
    },
    text: {
        fontSize: 18, 
        marginVertical: 10,
    },
});

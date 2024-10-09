import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlass } from 'phosphor-react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors'
import axios from 'axios';

import ItemPesquisa from '@/components/ItemPesquisa';

export default function Page() {
  const [pesquisa, setPesquisa] = useState('');

  const handlePesquisa = (pesquisa) => {
    setPesquisa(pesquisa);
    console.log(pesquisa);

    axios.post(`http://localhost:8080/cadastrar`)
      .then(response => {
        console.log('Dados da API:', response.data);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <SafeAreaView style={styles.container}>

        <View style={styles.pesquisar}>
          <MagnifyingGlass size={20} color={Colors.grey}/>
          <TextInput style={styles.input} placeholderTextColor={Colors.grey} placeholder="Pesquisar por nova planta ou vegetal" value={pesquisa} onChangeText={handlePesquisa} />
        </View>

        <ScrollView style={styles.scroll}>
            <ItemPesquisa />
            <ItemPesquisa />
            <ItemPesquisa />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  pesquisar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 60,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  scroll: {
    marginTop: 20,
  }
});
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Garden() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Ver suas plantações</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
  },
});
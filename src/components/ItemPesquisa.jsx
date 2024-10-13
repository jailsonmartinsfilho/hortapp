import { View, StyleSheet, Image, Text } from 'react-native';

const imagensPlantas = {
  batata: require('@/assets/images/batata.png'),
  couve: require('@/assets/images/couve.png'),
  'couve-flor': require('@/assets/images/couveflor.png'),
  tomate: require('@/assets/images/tomate.png'),
};

export default function ItemPesquisa({ nome }) {
  return (
    <View style={styles.itemPesquisa}>
      <Image source={imagensPlantas[nome.toLowerCase()]} style={styles.imagem} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemPesquisa: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: 'white',
    backgroundColor: '#DCDEDD',
    borderRadius: 10,
    height: 80,
    width: 80, 
    borderColor: 'transparent', // Borda transparente para simular o brilho
    borderLeftColor: 'white',   // Luz no canto superior esquerdo
    borderTopColor: 'white',    // Luz no topo
        // Simular sombra no canto inferior direito
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 }, // Deslocamento da sombra
    shadowOpacity: 0.5, // Intensidade da sombra
    shadowRadius: 6,
    elevation: 8, // Sombras no Android
  },
  imagem: {
    height: 45,
    width: 45 ,
    resizeMode: 'contain',
  },
  texto: {
    fontSize: 20,
    marginLeft: 10,
  },
});
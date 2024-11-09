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
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 80,
    width: 80, 
    borderWidth: 2,
    borderColor: 'gray'
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
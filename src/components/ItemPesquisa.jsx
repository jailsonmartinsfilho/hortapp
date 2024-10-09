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
      <Text style={styles.texto}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 70,
    paddingHorizontal: 15,
    elevation: 2,
    marginBottom: 10,
  },
  imagem: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginLeft: 10,
    borderWidth: 1,
  },
  texto: {
    fontSize: 20,
    marginLeft: 10,
  },
});
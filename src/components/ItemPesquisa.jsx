import { View, StyleSheet, Image, Text } from 'react-native';

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


export default function ItemPesquisa({ nome }) {
  return (
    <View style={styles.itemPesquisa}>
      <View style={styles.containerImagem}><Image source={imagensPlantas[nome.toLowerCase()]} style={styles.imagem}/></View>
      <Text style={styles.texto}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemPesquisa: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    width: '100%', 
    borderBottomColor: '#d1e8d8',
    borderBottomWidth: 2,
    borderStyle: 'dotted',
  },
  containerImagem: {
    borderRadius: 10,
    height: 70,
    width: 70,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
   },
  texto: {
    fontSize: 18,
    marginLeft: 15,
    fontFamily: 'FibraOneSemiBold',
    color: '#202420'
  },
});
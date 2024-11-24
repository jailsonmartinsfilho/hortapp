import { View, StyleSheet, Image, Text } from 'react-native';

const imagensPlantas = {
  batata: require('@/assets/images/batata.png'),
  couve: require('@/assets/images/couve.png'),
  'couve-flor': require('@/assets/images/couveflor.png'),
  tomate: require('@/assets/images/tomate.png'),
};

export default function ItemJardim({ nome }) {
  return (
    <View style={styles.itemPesquisa}>
      <View style={styles.containerImagem}><Image source={imagensPlantas[nome.toLowerCase()]} style={styles.imagem} /></View>
      <View style={styles.containerPlantacaoInfo}>
        <Text style={styles.texto}>{nome}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemPesquisa: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 130,
    width: '99%',
    paddingLeft: 12,
    borderRadius: 20,
    elevation: 3
  },
  containerImagem: {
    borderRadius: 10,
    height: 110,
    width: 90,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  texto: {
    fontSize: 22,
    fontFamily: 'FibraOneBold',
    color: '#202420'
  },
  containerPlantacaoInfo: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingLeft: 15
  }
});
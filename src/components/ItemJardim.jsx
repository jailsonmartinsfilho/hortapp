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
      <Image source={imagensPlantas[nome.toLowerCase()]} style={styles.imagem} />
      <Text style={styles.texto}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemPesquisa: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46f739',
    height: 60,
    width: '100%', 
    borderRadius: 10
  },
  imagem: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  texto: {
    fontSize: 17,
    marginLeft: 10,
    fontFamily: 'FibraOneBold'
  },
});
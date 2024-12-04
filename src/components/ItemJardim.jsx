import { View, StyleSheet, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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


export default function ItemJardim({ nome, nome_cientifico }) {
  return (
    <View style={styles.itemPesquisa}>
      <View style={styles.containerImagem}><Image source={imagensPlantas[nome.toLowerCase()]} style={styles.imagem} /></View>
      <View style={styles.containerPlantacaoInfo}>
        <Text style={styles.texto}>{nome}</Text>
        <Text style={styles.subTexto}>{nome_cientifico}</Text>

        <View style={styles.etiqueta}>
          <MaterialCommunityIcons name="watering-can" size={27} color="#a4acba" style={{ marginLeft: 0, marginBottom: 2 }} />
          <Text>A cada 4 dias</Text>
        </View>

        <View style={styles.etiqueta}>
          <MaterialCommunityIcons name="sprout" size={23} color="#a4acba" style={{ marginLeft: 0, marginBottom: 2, marginRight: 5 }} />
          <Text>A cada 1 semana</Text>
        </View>
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
    height: 145,
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
  subTexto: {
    fontSize: 15,
    fontFamily: 'FibraOneMedium',
    color: '#202420',
    marginTop: 7,
    marginBottom: 11
  },
  containerPlantacaoInfo: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingLeft: 15
  },
  etiqueta: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  }
});
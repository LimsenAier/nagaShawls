import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const DATA = [
  {
    name: 'Ao',
    image: require('./assets/digital/AoDigital.png'),
  },
  {
    name: 'Angami',
    image: require('./assets/digital/angamiDigital.png'),
  },
  {
    name: 'Konyak',
    image: require('./assets/digital/konyakDigital.png'),
  },
  {name: 'Sangtam',},
  {
    name: 'Zeliang',
    image: require('./assets/digital/ZeliangDigital.png'),
  },
  {
    name: 'Phom',
    image: require('./assets/digital/PhomDigital.png'),
  },
];
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Title */}
      <Text style={styles.title}>
        Locate your{"\n"}shawls
      </Text>

      {/* Cards */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <FlatList
          data={DATA}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 60, paddingHorizontal: 20 }}
          renderItem={({ item }) => (

<TouchableOpacity
  style={styles.box}
  onPress={() => navigation.navigate(item.name)}
>
  <ImageBackground
    source={item.image}
    style={styles.boxBackground}
    imageStyle={styles.boxImage}
  >
    <LinearGradient
  colors={[
    'rgba(180, 180, 180, 0.05)',
    'rgba(120, 120, 120, 0.20)',
    'rgba(50, 50, 50, 0.65)',
  ]}
  locations={[0, 0.55, 1]}
  style={styles.overlay}
/>
<Text
  style={[
    styles.boxText,
    {
      color: '#FFFFFF',
    },
  ]}
>
  {item.name}
</Text>
  </ImageBackground>
</TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004361',
  },

  title: {
    fontSize: 42,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 15,
    marginTop: 60,
  },

  card: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 2,
    top: 40,
  },

  box: {
    width: '46%',
    aspectRatio: 1,
    backgroundColor: '#111010',
    borderRadius: 20,
    overflow: 'hidden',
},

boxBackground: {
  flex: 1,
  justifyContent: 'flex-end',
},

boxImage: {
  borderRadius: 20,
},

overlay: {
  ...StyleSheet.absoluteFillObject,
},
boxText: {
  fontSize: 25,
  fontWeight: '700',
  color: '#fff',
   marginLeft: 20,
  marginBottom: 15,
  zIndex: 2
},
});
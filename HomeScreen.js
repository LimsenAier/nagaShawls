import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';

const DATA = [
  { name: 'Ao'},
  {name: 'Angami'},
  { name: 'Konyak'},
  { name: 'Sangtam'},
  { name: 'Zeliang'},
  { name: 'Phom'},
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
          <TouchableOpacity style={[styles.box, { backgroundColor: colors.box }]}
          onPress={() => navigation.navigate(item.name)}>           
          
          <Text style={[styles.boxText, { color: colors.boxText}]}>
            {item.name}</Text>
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
},

boxText: {
  fontSize: 25,
  fontWeight: '700',
  left: 20,
  top: 110,
},
});
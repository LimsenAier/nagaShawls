import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zeliang Shawl</Text>
      <Text style={styles.text}>
        Explore the traditional shawls and patterns of the Zeliang tribe.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function AboutScreen() {

  const { isDark, colors } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: '#004361' }
      ]}
    >

      <View
        style={[
          styles.card,
          { backgroundColor: colors.card }
        ]}
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {/* ICON */}

          <View style={styles.iconContainer}>
            <Ionicons
              name="shirt-outline"
              size={55}
              color="#fff"
            />
          </View>

          {/* APP NAME */}

          <Text
            style={[
              styles.appName,
              { color: colors.text }
            ]}
          >
            Naga Shawls Identifier
          </Text>

          <Text
            style={[
              styles.version,
              { color: colors.secondaryText }
            ]}
          >
            Version 1.0.0
          </Text>

          {/* DESCRIPTION */}

          <Text
            style={[
              styles.description,
              { color: colors.text }
            ]}
          >
            Naga Shawls Identifier is a mobile
            application designed to identify
            traditional Naga shawls based on
            their visual patterns and designs.
          </Text>

          <Text
            style={[
              styles.description,
              { color: colors.text }
            ]}
          >
            The application helps users explore
            shawls associated with different Naga
            tribes and learn more about their
            traditional designs.
          </Text>


          {/* ABOUT THE PROJECT */}

          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text }
            ]}
          >
            About the Project
          </Text>

          <Text
            style={[
              styles.description,
              { color: colors.text }
            ]}
          >
            This application was developed as a
            B.Tech project using computer vision
            and machine learning techniques for
            image-based shawl classification.
          </Text>


          {/* TRIBES */}

          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text }
            ]}
          >
            Supported Tribes
          </Text>

          <Text
            style={[
              styles.description,
              { color: colors.text }
            ]}
          >
            Ao • Angami • Konyak • Sangtam{'\n'}
            Zeliang • Phom
          </Text>


          {/* TECHNOLOGY */}

          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text }
            ]}
          >
            Technology
          </Text>

          <View style={styles.techList}>

            <Text
              style={[
                styles.techItem,
                { color: colors.text }
              ]}
            >
              • React Native
            </Text>

            <Text
              style={[
                styles.techItem,
                { color: colors.text }
              ]}
            >
              • Expo
            </Text>

            <Text
              style={[
                styles.techItem,
                { color: colors.text }
              ]}
            >
              • Computer Vision
            </Text>

            <Text
              style={[
                styles.techItem,
                { color: colors.text }
              ]}
            >
              • Machine Learning
            </Text>

          </View>


          {/* FOOTER */}

          <Text style={styles.footer}>
            © 2026 Naga Shawls Identifier
          </Text>

        </ScrollView>

      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  card: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    top: 35,
  },

  content: {
    paddingHorizontal: 25,
    paddingBottom: 50,
  },

  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#004361',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },

  appName: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },

  version: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },

  description: {
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 10,
  },

  techList: {
    marginBottom: 20,
  },

  techItem: {
    fontSize: 16,
    lineHeight: 28,
  },

  footer: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 30,
  },

});
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

export default function HelpScreen() {

  const { colors } = useTheme();

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

          {/* TITLE */}

          <Text
            style={[
              styles.title,
              { color: colors.text }
            ]}
          >
            Help
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.secondaryText }
            ]}
          >
            How to use Naga Shawls Identifier
          </Text>


          {/* STEP 1 */}

          <View style={styles.step}>

            <View style={styles.numberCircle}>
              <Text style={styles.number}>01</Text>
            </View>

            <View style={styles.stepContent}>
              <Text
                style={[
                  styles.stepTitle,
                  { color: colors.text }
                ]}
              >
                Open Camera
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: colors.secondaryText }
                ]}
              >
                Go to the Camera tab from the
                bottom navigation.
              </Text>
            </View>

          </View>


          {/* STEP 2 */}

          <View style={styles.step}>

            <View style={styles.numberCircle}>
              <Text style={styles.number}>02</Text>
            </View>

            <View style={styles.stepContent}>
              <Text
                style={[
                  styles.stepTitle,
                  { color: colors.text }
                ]}
              >
                Take or Choose a Photo
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: colors.secondaryText }
                ]}
              >
                Capture a new image using the
                camera or select an existing photo
                from your gallery.
              </Text>
            </View>

          </View>


          {/* STEP 3 */}

          <View style={styles.step}>

            <View style={styles.numberCircle}>
              <Text style={styles.number}>03</Text>
            </View>

            <View style={styles.stepContent}>
              <Text
                style={[
                  styles.stepTitle,
                  { color: colors.text }
                ]}
              >
                Position the Shawl
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: colors.secondaryText }
                ]}
              >
                Keep the shawl visible and make
                sure its pattern can be seen clearly.
              </Text>
            </View>

          </View>


          {/* STEP 4 */}

          <View style={styles.step}>

            <View style={styles.numberCircle}>
              <Text style={styles.number}>04</Text>
            </View>

            <View style={styles.stepContent}>
              <Text
                style={[
                  styles.stepTitle,
                  { color: colors.text }
                ]}
              >
                Preview
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: colors.secondaryText }
                ]}
              >
                Review the selected image before
                identifying the shawl.
              </Text>
            </View>

          </View>


          {/* STEP 5 */}

          <View style={styles.step}>

            <View style={styles.numberCircle}>
              <Text style={styles.number}>05</Text>
            </View>

            <View style={styles.stepContent}>
              <Text
                style={[
                  styles.stepTitle,
                  { color: colors.text }
                ]}
              >
                Identify
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: colors.secondaryText }
                ]}
              >
                Tap "Identify Shawl" to analyze
                the image.
              </Text>
            </View>

          </View>


          {/* STEP 6 */}

          <View style={styles.step}>

            <View style={styles.numberCircle}>
              <Text style={styles.number}>06</Text>
            </View>

            <View style={styles.stepContent}>
              <Text
                style={[
                  styles.stepTitle,
                  { color: colors.text }
                ]}
              >
                View Result
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: colors.secondaryText }
                ]}
              >
                View the predicted shawl
                classification provided.
              </Text>
            </View>

          </View>


          {/* DIVIDER */}

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.secondaryText }
            ]}
          />


          {/* TIPS */}

          <Text
            style={[
              styles.tipsTitle,
              { color: colors.text }
            ]}
          >
            Tips for Better Results
          </Text>


          <View style={styles.tipRow}>
            <Ionicons
              name="sunny-outline"
              size={21}
              color="#004361"
            />

            <Text
              style={[
                styles.tipText,
                { color: colors.secondaryText }
              ]}
            >
              Use good lighting.
            </Text>
          </View>


          <View style={styles.tipRow}>
            <Ionicons
              name="image-outline"
              size={21}
              color="#004361"
            />

            <Text
              style={[
                styles.tipText,
                { color: colors.secondaryText }
              ]}
            >
              Keep the image clear and sharp.
            </Text>
          </View>


          <View style={styles.tipRow}>
            <Ionicons
              name="scan-outline"
              size={21}
              color="#004361"
            />

            <Text
              style={[
                styles.tipText,
                { color: colors.secondaryText }
              ]}
            >
              Show the shawl pattern clearly.
            </Text>
          </View>


          <View style={styles.tipRow}>
            <Ionicons
              name="eye-outline"
              size={21}
              color="#004361"
            />

            <Text
              style={[
                styles.tipText,
                { color: colors.secondaryText }
              ]}
            >
              Avoid blurry images.
            </Text>
          </View>


          <View style={styles.tipRow}>
            <Ionicons
              name="hand-left-outline"
              size={21}
              color="#004361"
            />

            <Text
              style={[
                styles.tipText,
                { color: colors.secondaryText }
              ]}
            >
              Avoid covering the shawl.
            </Text>
          </View>


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
    paddingTop: 25,
    paddingBottom: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    marginBottom: 30,
  },

  /* STEPS */

  step: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  numberCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#004361',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  number: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  stepContent: {
    flex: 1,
    paddingTop: 2,
  },

  stepTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
  },

  /* DIVIDER */

  divider: {
    height: 1,
    opacity: 0.25,
    marginVertical: 15,
  },

  /* TIPS */

  tipsTitle: {
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 20,
  },

  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  tipText: {
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },

});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView, 
  TouchableOpacity,
  Modal,
  Image} from 'react-native';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../ThemeContext';

function ZoomableImage({ image }) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // PINCH TO ZOOM
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = Math.max(
        1,
        Math.min(savedScale.value * event.scale, 6)
      );
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  // DRAG IMAGE
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value =
        savedTranslateX.value + event.translationX;

      translateY.value =
        savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // DOUBLE TAP
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withSpring(1);
        savedScale.value = 1;

        translateX.value = withSpring(0);
        translateY.value = withSpring(0);

        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        scale.value = withSpring(2);
        savedScale.value = 2;
      }
    });

  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    doubleTapGesture
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.Image
        source={image}
        style={[
          styles.fullImage,
          animatedStyle,
        ]}
        resizeMode="contain"
      />
    </GestureDetector>
  );
}

export default function PhomScreen() {
  const { colors } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Phom Shawl
      </Text>

      <Text style={styles.text}>
        Explore the traditional shawls and{"\n"}
        patterns of the Phom tribe.
      </Text>

      {/* CARD */}
      <View style={[styles.card, {backgroundColor: colors.card }]}>


        <Modal
  visible={selectedImage !== null}
  transparent={true}
  animationType="fade"
  onRequestClose={() => setSelectedImage(null)}
>
  <View style={styles.imageModal}>

    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setSelectedImage(null)}
    >
      <AntDesign name="close" size={24} color="#fff" />
    </TouchableOpacity>

    {selectedImage && (
      <ZoomableImage image={selectedImage} />
    )}
  </View>
</Modal>

        {/* SCROLLABLE CONTENT */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* BOXES */}
          <View style={styles.boxContainer}>

            <TouchableOpacity style={styles.imageBox}
            onPress={() => setSelectedImage(require('../assets/phom1.jpg'))}>
              <Image
              source={require('../assets/phom1.jpg')}
              style={styles.shawlImage}
              />
              </TouchableOpacity>

            <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom2.jpg'))}
>
  <Image
    source={require('../assets/phom2.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom3.jpg'))}
>
  <Image
    source={require('../assets/phom3.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom4.jpg'))}
>
  <Image
    source={require('../assets/phom4.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom5.jpg'))}
>
  <Image
    source={require('../assets/phom5.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom6.jpg'))}
>
  <Image
    source={require('../assets/phom6.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom7.jpg'))}
>
  <Image
    source={require('../assets/phom7.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

   <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom8.jpg'))}
>
  <Image
    source={require('../assets/phom8.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

   <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom9.jpg'))}
>
  <Image
    source={require('../assets/phom9.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom10.jpg'))}
>
  <Image
    source={require('../assets/phom10.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom11.jpg'))}
>
  <Image
    source={require('../assets/phom11.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom12.jpg'))}
>
  <Image
    source={require('../assets/phom12.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom13.jpg'))}
>
  <Image
    source={require('../assets/phom13.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom14.jpg'))}
>
  <Image
    source={require('../assets/phom14.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom15.jpg'))}
>
  <Image
    source={require('../assets/phom15.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom16.jpg'))}
>
  <Image
    source={require('../assets/phom16.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom17.jpg'))}
>
  <Image
    source={require('../assets/phom17.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom18.jpg'))}
>
  <Image
    source={require('../assets/phom18.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/phom19.jpg'))}
>
  <Image
    source={require('../assets/phom19.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#004361',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: '30%',
    marginLeft: 20,
  },
  text: {
    color: '#fff',
    marginTop: 1,
    fontSize: 16,
    marginLeft: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageBox: {
  width: '48%',
  height: 160,
  backgroundColor: '#E5E5E5',
  borderRadius: 15,
  marginBottom: 15,
  overflow: 'hidden',
  borderWidth: 0.5
},
 shawlImage: {
  width: '100%',
  height: '100%',
  borderRadius: 15,
  resizeMode: 'cover',
},
imageModal: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.95)',
  justifyContent: 'center',
  alignItems: 'center',
},
fullImage: {
  width: '90%',
  height: '75%',
},
closeButton: {
  position: 'absolute',
  top: 50,
  right: 25,
  width: 45,
  height: 45,
  borderRadius: 23,
  backgroundColor: 'rgba(255,255,255,0.2)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
});
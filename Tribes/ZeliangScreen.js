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

export default function ZeliangScreen() {
  const { colors } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Zeliang Shawl
      </Text>

      <Text style={styles.text}>
        Explore the traditional shawls and{"\n"}
        patterns of the Zeliang tribe.
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
            onPress={() => setSelectedImage(require('../assets/zeliang1.jpg'))}>
              <Image
              source={require('../assets/zeliang1.jpg')}
              style={styles.shawlImage}
              />
              </TouchableOpacity>

            <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang2.jpg'))}
>
  <Image
    source={require('../assets/zeliang2.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang3.jpg'))}
>
  <Image
    source={require('../assets/zeliang3.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang4.jpg'))}
>
  <Image
    source={require('../assets/zeliang4.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang5.jpg'))}
>
  <Image
    source={require('../assets/zeliang5.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang6.jpg'))}
>
  <Image
    source={require('../assets/zeliang6.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

          <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang7.jpg'))}
>
  <Image
    source={require('../assets/zeliang7.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

   <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang8.jpg'))}
>
  <Image
    source={require('../assets/zeliang8.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>

   <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang9.jpg'))}
>
  <Image
    source={require('../assets/zeliang9.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang10.jpg'))}
>
  <Image
    source={require('../assets/zeliang10.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang11.jpg'))}
>
  <Image
    source={require('../assets/zeliang11.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang12.jpg'))}
>
  <Image
    source={require('../assets/zeliang12.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang13.jpg'))}
>
  <Image
    source={require('../assets/zeliang13.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang14.jpg'))}
>
  <Image
    source={require('../assets/zeliang14.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang15.jpg'))}
>
  <Image
    source={require('../assets/zeliang15.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang16.jpg'))}
>
  <Image
    source={require('../assets/zeliang16.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang17.jpg'))}
>
  <Image
    source={require('../assets/zeliang17.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang18.jpg'))}
>
  <Image
    source={require('../assets/zeliang18.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang19.jpg'))}
>
  <Image
    source={require('../assets/zeliang19.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang20.jpg'))}
>
  <Image
    source={require('../assets/zeliang20.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang21.jpg'))}
>
  <Image
    source={require('../assets/zeliang21.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang22.jpg'))}
>
  <Image
    source={require('../assets/zeliang22.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
 <TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang23.jpg'))}
>
  <Image
    source={require('../assets/zeliang23.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
<TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang24.jpg'))}
>
  <Image
    source={require('../assets/zeliang24.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
<TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang25.jpg'))}
>
  <Image
    source={require('../assets/zeliang25.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
<TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang26.jpg'))}
>
  <Image
    source={require('../assets/zeliang26.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
<TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang27.jpg'))}
>
  <Image
    source={require('../assets/zeliang27.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
<TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang28.jpg'))}
>
  <Image
    source={require('../assets/zeliang28.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
<TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang29.jpg'))}
>
  <Image
    source={require('../assets/zeliang29.jpg')}
    style={styles.shawlImage}
  />
</TouchableOpacity>
<TouchableOpacity
  style={styles.imageBox}
  onPress={() => setSelectedImage(require('../assets/zeliang30.jpg'))}
>
  <Image
    source={require('../assets/zeliang30.jpg')}
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
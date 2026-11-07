import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from './ThemeContext';
import { extractVGG16Features } from './VGG16FeatureExtractor';
import { predictShawl } from './SVMClassifier';

export default function CameraScreen() {
  const { colors } = useTheme();

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [flashOn, setFlashOn] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [identifyError, setIdentifyError] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [facing, setFacing] = useState('back');
  const [containerSize, setContainerSize] = useState(null);

  // Clear previous results and errors.
  const resetResult = () => {
    setPrediction(null);
    setIdentifyError(null);
    setPhotoError(null);
  };

  // Select an image from the gallery.
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        resetResult();

        setPhoto(result.assets[0].uri);

        console.log('Selected image:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Could not select image:', error);

      setPhotoError(
        error?.message || 'Could not open the image gallery.'
      );
    }
  };

  // Switch between the front and rear cameras.
  const toggleCamera = () => {
    setFacing((current) =>
      current === 'back' ? 'front' : 'back'
    );

    setFlashOn(false);
  };

  // Capture a photo.
  const takePhoto = async () => {
    if (!cameraRef.current) {
      setPhotoError(
        'Camera is not ready. Please try again.'
      );
      return;
    }

    try {
      const capturedPhoto =
        await cameraRef.current.takePictureAsync({
          quality: 1,
        });

      if (capturedPhoto?.uri) {
        resetResult();

        setPhoto(capturedPhoto.uri);

        console.log('Photo taken:', capturedPhoto.uri);
      } else {
        setPhotoError(
          'The camera did not return an image. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error taking photo:', error);

      setPhotoError(
        error?.message || 'Could not take the photo.'
      );
    }
  };

  // Extract VGG16 features and classify the shawl using SVM.
  const handleIdentify = async () => {
    if (!photo || isIdentifying) {
      return;
    }

    setIsIdentifying(true);
    setPrediction(null);
    setIdentifyError(null);

    try {
      // Extract the 512-dimensional feature vector.
      const features = await extractVGG16Features(photo);

      // Predict the Naga tribe.
      const result = predictShawl(features);

      if (
        typeof result !== 'string' ||
        result.length === 0
      ) {
        throw new Error(
          'The classifier returned an invalid prediction.'
        );
      }

      setPrediction(result);

      console.log('Shawl prediction:', result);
    } catch (error) {
      console.error(
        'Shawl identification failed:',
        error
      );

      setIdentifyError(
        error?.message ||
          'Could not identify this shawl. Please try another image.'
      );
    } finally {
      setIsIdentifying(false);
    }
  };

  // Wait for the camera permission state.
  if (!permission) {
    return (
      <View style={styles.permissionContainer} />
    );
  }

  // Request permission if the camera is not authorized.
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text
          style={[
            styles.permissionText,
            { color: colors.text },
          ]}
        >
          Camera permission is required to scan a shawl.
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            Allow Camera
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Display the captured or selected image.
  if (photo) {
    const formattedPrediction =
      typeof prediction === 'string' &&
      prediction.length > 0
        ? prediction.charAt(0).toUpperCase() +
          prediction.slice(1)
        : null;

    return (
      <View style={styles.previewContainer}>
        {/* Image preview */}
        <Image
          source={{ uri: photo }}
          style={styles.previewImage}
          resizeMode="contain"
        />

        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setPhoto(null);
            resetResult();
          }}
          accessibilityRole="button"
          accessibilityLabel="Return to camera"
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Screen title */}
        <Text style={styles.previewTitle}>
          Shawl Preview
        </Text>

        {/* Identification result card */}
        <View
          style={[
            styles.previewCard,
            { backgroundColor: colors.card },
          ]}
        >
          {isIdentifying && (
            <Text
              style={[
                styles.statusText,
                { color: colors.text },
              ]}
            >
              Identifying shawl...
            </Text>
          )}

          {formattedPrediction && !isIdentifying && (
            <Text
              style={[
                styles.predictionText,
                { color: colors.text },
              ]}
            >
              Identified Tribe: {formattedPrediction}
            </Text>
          )}

          {identifyError && (
            <Text style={styles.errorText}>
              {identifyError}
            </Text>
          )}

          {photoError && (
            <Text style={styles.errorText}>
              {photoError}
            </Text>
          )}

          {/* Identify button */}
          <TouchableOpacity
            style={[
              styles.identifyButton,
              isIdentifying &&
                styles.identifyButtonDisabled,
            ]}
            onPress={handleIdentify}
            disabled={isIdentifying}
            accessibilityRole="button"
          >
            <Text style={styles.identifyText}>
              {isIdentifying
                ? 'Identifying...'
                : 'Identify Shawl'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main camera screen.
  return (
    <SafeAreaView
      style={styles.container}
      onLayout={(event) => {
        const { width, height } =
          event.nativeEvent.layout;

        setContainerSize({ width, height });
      }}
    >
      {/* Camera preview */}
      {containerSize && (
        <CameraView
          ref={cameraRef}
          key={facing}
          style={[
            styles.camera,
            {
              width: containerSize.width,
              height: containerSize.height,
            },
          ]}
          facing={facing}
          flash={
            flashOn && facing === 'back'
              ? 'on'
              : 'off'
          }
          mirror={facing === 'front'}
        />
      )}

      {/* Camera overlay */}
      <View style={styles.overlay}>
        {/* Flash button */}
        <TouchableOpacity
          style={styles.flashButton}
          onPress={() =>
            setFlashOn((current) => !current)
          }
          disabled={facing === 'front'}
          accessibilityRole="button"
          accessibilityLabel="Toggle flash"
        >
          <Ionicons
            name={
              flashOn && facing === 'back'
                ? 'flash'
                : 'flash-off'
            }
            size={20}
            color={
              facing === 'front' ? '#888' : '#fff'
            }
          />
        </TouchableOpacity>

        {/* Scanning frame */}
        <View style={styles.frame}>
          <View
            style={[styles.corner, styles.topLeft]}
          />

          <View
            style={[styles.corner, styles.topRight]}
          />

          <View
            style={[styles.corner, styles.bottomLeft]}
          />

          <View
            style={[styles.corner, styles.bottomRight]}
          />

          <Text style={styles.instruction}>
            Position the shawl inside the frame
          </Text>
        </View>
      </View>

      {/* Bottom camera controls */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card },
        ]}
      >
        {photoError && (
          <Text style={styles.errorText}>
            {photoError}
          </Text>
        )}

        <View style={styles.bottomBar}>
          {/* Gallery button */}
          <TouchableOpacity
            onPress={pickImage}
            accessibilityRole="button"
            accessibilityLabel="Choose image from gallery"
          >
            <Ionicons
              name="images-outline"
              size={28}
              color="#999999"
            />
          </TouchableOpacity>

          {/* Capture button */}
          <TouchableOpacity
            style={styles.captureBtn}
            onPress={takePhoto}
            accessibilityRole="button"
            accessibilityLabel="Take photo"
          >
            <View style={styles.innerCircle} />
          </TouchableOpacity>

          {/* Switch camera button */}
          <TouchableOpacity
            onPress={toggleCamera}
            accessibilityRole="button"
            accessibilityLabel="Switch camera"
          >
            <Ionicons
              name="camera-reverse-outline"
              size={28}
              color="#999999"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004361',
  },

  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  frame: {
    width: 280,
    height: 280,
    position: 'relative',
    justifyContent: 'center',
    bottom: 100,
  },

  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#fff',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },

  instruction: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    position: 'absolute',
    bottom: -35,
    width: 270,
  },

  flashButton: {
    position: 'absolute',
    top: 6,
    right: 25,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
  },

  bottomBar: {
    position: 'absolute',
    top: 35,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#999999',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerCircle: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#999999',
  },

  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  permissionButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#004361',
  },

  permissionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  previewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#010101',
  },

  previewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 250,
    width: '100%',
    height: '100%',
  },

  previewCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 10,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  previewTitle: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 10,
  },

  statusText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },

  predictionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
  },

  identifyButton: {
    marginTop: 10,
    width: '70%',
    minHeight: 55,
    borderRadius: 28,
    backgroundColor: '#004361',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  identifyButtonDisabled: {
    opacity: 0.65,
  },

  identifyText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
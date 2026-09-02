import React, { useRef, useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons,} from '@expo/vector-icons';
import {CameraView, useCameraPermissions,} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from './ThemeContext';


export default function CameraScreen() {

   const { colors } = useTheme();
   
  //states
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [flashOn, setFlashOn] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [facing, setFacing] = useState('back');

  //functions
    const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const selectedImage = result.assets[0].uri;
    
    setPhoto(selectedImage);

    console.log('Selected image:', selectedImage);
  }
};

//switch camera
  const toggleCamera = () => {
  setFacing(current =>
    current === 'back' ? 'front' : 'back'
  );

};


  // Take photo
  const takePhoto = async () => {
  if (!cameraRef.current) {
    return;
  }

  try {
    const capturedPhoto =
      await cameraRef.current.takePictureAsync({
        quality: 1,
      });

    setPhoto(capturedPhoto.uri);

    console.log('Photo taken:', capturedPhoto.uri);

  } catch (error) {
    console.log('Error taking photo:', error);
  }
};

//identify image
const handleIdentify = () => {
  console.log('Identifying image:', photo);

  // Model prediction will be added here later
}; 


// photo preview
if (photo) {
  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={{ uri: photo }}
        style={styles.previewImage}
      />

      <View style={styles.previewOverlay}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setPhoto(null)}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.previewTitle}>
          Shawl Preview
        </Text>

        <TouchableOpacity
          style={styles.identifyButton}
          onPress={handleIdentify}
        >
          <Text style={styles.identifyText}>
            Identify Shawl
          </Text>
        </TouchableOpacity>
       </View>
    </SafeAreaView>
  );
}


  // Request camera permission
  if (!permission) {
    return <View />;
  }


  if (!permission.granted) {

    return (
      <SafeAreaView style={styles.permissionContainer}>

        <Text style={styles.permissionText}>
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


  return (

    <SafeAreaView style={styles.container}>

      {/* CAMERA */}

      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        flash={flashOn ? 'on' : 'off'}
      />


      {/* CAMERA OVERLAY */}

      <View style={styles.overlay}>

        {/* FLASH BUTTON */}

        <TouchableOpacity
          style={styles.flashButton}
          onPress={() => setFlashOn(!flashOn)}
        >

          <Ionicons
            name={
              flashOn
                ? 'flash'
                : 'flash-off'
            }
            size={20}
            color="#fff"
          />

        </TouchableOpacity>


        {/* SCAN FRAME */}

        <View style={styles.frame}>

          <View
            style={[styles.corner, styles.topLeft,]}
          />
          <View
            style={[styles.corner, styles.topRight,]}
          />
          <View
            style={[styles.corner, styles.bottomLeft,]}
          />
          <View
            style={[styles.corner, styles.bottomRight,]}
          />
          <Text style={styles.instruction}>
            Position the shawl inside the frame
          </Text>
        </View>
      </View>


      {/* BOTTOM CARD */}

      <View style={[styles.card, {backgroundColor: colors.card}]}>
        <View style={styles.bottomBar}>

          {/* GALLERY */}

          <TouchableOpacity onPress={pickImage}>
            <Ionicons
              name="images-outline"
              size={28}
              color="#999999"
            />
          </TouchableOpacity>


          {/* CAPTURE */}

          <TouchableOpacity
            style={styles.captureBtn}
            onPress={takePhoto}
          >

            <View style={styles.innerCircle} />
          </TouchableOpacity>


          {/* SWITCH CAMERA */}

          <TouchableOpacity onPress={toggleCamera}>
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


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#004361',
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


  /* FLASH */

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


  /* BOTTOM CARD */

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


  /* CAPTURE BUTTON */

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


  /* PERMISSION */

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

  previewImage: {
  ...StyleSheet.absoluteFillObject,
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
  backgroundColor: '#000',
},

previewOverlay: {
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 20,
  paddingBottom: 40,
},

backButton: {
  position: 'absolute',
  marginTop: 57,
  left: 10,
  width: 45,
  height: 45,
  borderRadius: 23,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},

previewTitle: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 50,
},

identifyButton: {
  width: '70%',
  height: 55,
  marginBottom: 190,
  borderRadius: 28,
  backgroundColor: '#004361',
  justifyContent: 'center',
  alignItems: 'center',
},

identifyText: {
  color: '#fff',
  fontSize: 17,
  fontWeight: 'bold',
},

});
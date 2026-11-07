import { loadTensorflowModel } from 'react-native-fast-tflite';
import * as ImageManipulator from 'expo-image-manipulator';
import { toByteArray } from 'base64-js';
import jpeg from 'jpeg-js';

// Load the TFLite model once and reuse it.
let modelPromise = null;

async function getModel() {
  if (!modelPromise) {
    const modelAsset = require('./assets/models/vgg16_feature_extractor.tflite');

    modelPromise = (async () => {
      const { Image } = require('react-native');
      const resolvedAsset = Image.resolveAssetSource(modelAsset);

      console.log('TFLITE ASSET:', JSON.stringify(resolvedAsset));

      return loadTensorflowModel(modelAsset, []);
    })();
  }

  return modelPromise;
}

/**
 * Convert an image URI into the 512 VGG16 features
 * required by SVMClassifier.js.
 */
export async function extractVGG16Features(imageUri) {
  if (!imageUri) {
    throw new Error('No image was provided.');
  }

  // Resize to the same dimensions used during training.
  const processedImage = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 224, height: 224 } }],
    {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    }
  );

  if (!processedImage.base64) {
    throw new Error('Could not convert the image to Base64.');
  }

  // Decode the resized JPEG into RGBA pixels.
  const jpegBytes = toByteArray(processedImage.base64);

  const decodedImage = jpeg.decode(jpegBytes, {
    useTArray: true,
    formatAsRGBA: true,
  });

  if (decodedImage.width !== 224 || decodedImage.height !== 224) {
    throw new Error(
      `Expected a 224x224 image, received ${decodedImage.width}x${decodedImage.height}.`
    );
  }

  // VGG16 expects float32 RGB input transformed to BGR
  // with ImageNet channel means subtracted.
  const input = new Float32Array(224 * 224 * 3);
  const pixels = decodedImage.data;

  for (let pixel = 0; pixel < 224 * 224; pixel++) {
    const sourceIndex = pixel * 4;
    const targetIndex = pixel * 3;

    const r = pixels[sourceIndex];
    const g = pixels[sourceIndex + 1];
    const b = pixels[sourceIndex + 2];

    input[targetIndex] = b - 103.939;
    input[targetIndex + 1] = g - 116.779;
    input[targetIndex + 2] = r - 123.68;
  }

  // Run the TFLite feature extractor.
  const model = await getModel();

  const outputs = await model.run([input.buffer]);

  if (!outputs || !outputs[0]) {
    throw new Error('The VGG16 model returned no output.');
  }

  const features = new Float32Array(outputs[0]);

  if (features.length !== 512) {
    throw new Error(
      `Expected 512 VGG16 features, received ${features.length}.`
    );
  }

  return features;
}
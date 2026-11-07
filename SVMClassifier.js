import supportVectors from './assets/models/support_vectors.json';
import dualCoefficients from './assets/models/dual_coef.json';
import intercepts from './assets/models/intercept.json';
import svmConfig from './assets/models/svm_config.json';

const CLASSES = svmConfig.classes;
const GAMMA = svmConfig.gamma;

const SUPPORT_COUNTS = [128, 144, 351, 173, 394];
const TOTAL_SUPPORT_VECTORS = 1190;
const FEATURE_COUNT = 512;

export function predictShawl(features) {
  if (!features || features.length !== FEATURE_COUNT) {
    throw new Error(
      `Expected ${FEATURE_COUNT} features, received ${
        features?.length ?? 0
      }.`
    );
  }

  if (
    CLASSES.length !== 5 ||
    svmConfig.n_features !== FEATURE_COUNT ||
    svmConfig.n_support_vectors !== TOTAL_SUPPORT_VECTORS ||
    !Number.isFinite(GAMMA) ||
    GAMMA <= 0 ||
    supportVectors.length !== TOTAL_SUPPORT_VECTORS ||
    supportVectors.some(
      (vector) =>
        vector.length !== FEATURE_COUNT ||
        vector.some((value) => !Number.isFinite(value))
    ) ||
    dualCoefficients.length !== CLASSES.length - 1 ||
    dualCoefficients.some(
      (row) =>
        row.length !== TOTAL_SUPPORT_VECTORS ||
        row.some((value) => !Number.isFinite(value))
    ) ||
    intercepts.length !==
      (CLASSES.length * (CLASSES.length - 1)) / 2 ||
    intercepts.some((value) => !Number.isFinite(value)) ||
    SUPPORT_COUNTS.reduce((sum, count) => sum + count, 0) !==
      TOTAL_SUPPORT_VECTORS
  ) {
    throw new Error('SVM model dimensions or configuration are inconsistent.');
  }

  // Calculate the RBF kernel between the image features
  // and each support vector.
  const kernels = new Float64Array(TOTAL_SUPPORT_VECTORS);

  for (let i = 0; i < TOTAL_SUPPORT_VECTORS; i++) {
    const vector = supportVectors[i];
    let squaredDistance = 0;

    for (let j = 0; j < FEATURE_COUNT; j++) {
      const difference = features[j] - vector[j];
      squaredDistance += difference * difference;
    }

    kernels[i] = Math.exp(-GAMMA * squaredDistance);
  }

  // Determine the start and end offsets for each class.
  const classOffsets = [0];

  for (const count of SUPPORT_COUNTS) {
    classOffsets.push(
      classOffsets[classOffsets.length - 1] + count
    );
  }

  // Perform one-versus-one classification.
  const votes = new Array(CLASSES.length).fill(0);
  let pairIndex = 0;

  for (let i = 0; i < CLASSES.length; i++) {
    for (let j = i + 1; j < CLASSES.length; j++) {
      let decision = 0;

      // Support vectors belonging to class i.
      for (
        let k = classOffsets[i];
        k < classOffsets[i + 1];
        k++
      ) {
        decision += dualCoefficients[j - 1][k] * kernels[k];
      }

      // Support vectors belonging to class j.
      for (
        let k = classOffsets[j];
        k < classOffsets[j + 1];
        k++
      ) {
        decision += dualCoefficients[i][k] * kernels[k];
      }

      decision += intercepts[pairIndex];

      if (decision > 0) {
        votes[i]++;
      } else {
        votes[j]++;
      }

      pairIndex++;
    }
  }

  // Return the class receiving the most votes.
  let bestClass = 0;

  for (let i = 1; i < votes.length; i++) {
    if (votes[i] > votes[bestClass]) {
      bestClass = i;
    }
  }

  return CLASSES[bestClass];
}


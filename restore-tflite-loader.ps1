$source = Join-Path $PSScriptRoot "patches\react-native-fast-tflite\HybridAssetLoader.kt"
$destination = Join-Path $PSScriptRoot "node_modules\react-native-fast-tflite\android\src\main\java\com\margelo\nitro\tflite\HybridAssetLoader.kt"
if (Test-Path $source) {
    if (Test-Path (Split-Path $destination)) {
        Copy-Item $source $destination -Force
        Write-Host "Custom TFLite asset loader restored."
    } else {
        Write-Host "TFLite Android source directory not found; skipping."
    }
}

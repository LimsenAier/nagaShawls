package com.margelo.nitro.tflite

import android.net.Uri
import android.util.Log
import androidx.annotation.Keep
import com.facebook.proguard.annotations.DoNotStrip
import com.margelo.nitro.NitroModules
import com.margelo.nitro.core.ArrayBuffer
import com.margelo.nitro.core.Promise
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileInputStream
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.URL

@Keep
@DoNotStrip
class HybridAssetLoader : HybridAssetLoaderSpec() {

    override fun loadAsset(path: String): Promise<ArrayBuffer> {
        return Promise.async {
            val bytes = loadBytes(path)
            return@async ArrayBuffer.copy(bytes)
        }
    }

    companion object {
        private const val TAG = "TfliteAssetLoader"

        private fun getApplicationContext() =
            NitroModules.applicationContext
                ?: throw IllegalStateException(
                    "Application context is not available"
                )

        private fun readStream(stream: InputStream): ByteArray {
            val output = ByteArrayOutputStream()
            val buffer = ByteArray(8192)

            stream.use { input ->
                while (true) {
                    val count = input.read(buffer)
                    if (count == -1) break
                    output.write(buffer, 0, count)
                }
            }

            return output.toByteArray()
        }

        @Suppress("DiscouragedApi")
        private fun loadFromRawResource(path: String): ByteArray {
            val context = getApplicationContext()

            val resourceId = context.resources.getIdentifier(
                path,
                "raw",
                context.packageName
            )

            if (resourceId == 0) {
                throw IllegalArgumentException(
                    "TFLite raw resource not found: $path"
                )
            }

            Log.i(TAG, "Loading bundled TFLite resource: $path")

            return readStream(
                context.resources.openRawResource(resourceId)
            )
        }

        private fun loadFromFile(uri: Uri, path: String): ByteArray {
            val filePath = uri.path
                ?: throw IllegalArgumentException(
                    "File path is missing: $path"
                )

            val file = File(filePath)

            if (!file.exists() || !file.canRead()) {
                throw IllegalArgumentException(
                    "File does not exist or cannot be read: $filePath"
                )
            }

            return readStream(FileInputStream(file))
        }

        private fun loadFromHttp(path: String): ByteArray {
            val connection =
                URL(path).openConnection() as HttpURLConnection

            connection.connectTimeout = 30000
            connection.readTimeout = 60000

            try {
                val status = connection.responseCode

                if (status !in 200..299) {
                    throw IllegalStateException(
                        "HTTP request failed: $status for $path"
                    )
                }

                return readStream(connection.inputStream)
            } finally {
                connection.disconnect()
            }
        }

        private fun loadBytes(path: String): ByteArray {
            Log.i(TAG, "Loading TFLite asset from: $path")

            if (!path.contains("://")) {
                return loadFromRawResource(path)
            }

            val uri = Uri.parse(path)

            return when (uri.scheme?.lowercase()) {
                "file" -> loadFromFile(uri, path)
                "http", "https" -> loadFromHttp(path)
                else -> throw IllegalArgumentException(
                    "Unsupported model URI: $path"
                )
            }
        }
    }
}

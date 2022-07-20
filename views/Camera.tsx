import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useCameraRatio } from '../hooks/useCameraRatio';
import { useCameraPermission } from '../hooks/usePermission';

export default function App() {
  const [image, setImage] = useState<string | undefined>();
  const hasPermission = useCameraPermission();
  const { prepareRatio, imagePadding, ratio } = useCameraRatio();

  const camera = useRef<Camera>(null);

  async function takePhoto() {
    const result = await camera?.current?.takePictureAsync({
      base64: true,
    });

    if (!result?.base64) return alert('Error taking photo');
    setImage(`data:image/png;base64,${result.base64}`);
    console.log(result);
  }

  if (hasPermission === null) {
    return (
      <View style={styles.information}>
        <Text>Waiting for camera permissions</Text>
      </View>
    );
  } else if (hasPermission === false) {
    return (
      <View style={styles.information}>
        <Text>No access to camera</Text>
      </View>
    );
  } else {
    return image ? (
      <View style={{ ...styles.container, backgroundColor: 'red' }}>
        <Image
          height={200}
          width={200}
          style={{ backgroundColor: 'red' }}
          source={{ uri: image }}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <Camera
          style={[
            styles.cameraPreview,
            { marginTop: imagePadding, marginBottom: imagePadding },
          ]}
          onCameraReady={async () => await prepareRatio(camera?.current)}
          ratio={ratio}
          ref={camera}
        >
          <TouchableOpacity
            onPress={takePhoto}
            style={{
              backgroundColor: 'red',
              height: 64,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Text>Take a photo</Text>
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  information: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraPreview: {
    flex: 1,
  },
});

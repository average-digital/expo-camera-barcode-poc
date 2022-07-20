import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useCameraRatio } from '../hooks/useCameraRatio';
import { usePermission } from '../hooks/usePermission';
import { useCamera } from '../providers/CameraProvider';
import { CameraProps } from '../navigation';
import { Button, IconButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

export default function CameraView({ navigation }: CameraProps) {
  const isFocused = useIsFocused();
  const hasPermission = usePermission('camera');
  const { setImage } = useCamera();
  const { prepareRatio, imagePadding, ratio } = useCameraRatio();

  const camera = useRef<Camera>(null);

  async function takePhoto() {
    const result = await camera?.current?.takePictureAsync({
      base64: true,
    });

    if (!result?.base64) return alert('Error taking photo');
    setImage(result);
    navigation.pop();
  }

  if (hasPermission === null) {
    return (
      <View>
        <Text>Waiting for camera permissions</Text>
      </View>
    );
  } else if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  } else if (isFocused) {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{
            flex: 1,
            paddingTop: imagePadding,
            paddingBottom: imagePadding,
          }}
          onCameraReady={async () => await prepareRatio(camera?.current)}
          ratio={ratio}
          ref={camera}
        >
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              bottom: 20,
              left: 20,
              right: 20,
            }}
          >
            <IconButton icon="camera" color="#fff" onPress={takePhoto}>
              Take photo
            </IconButton>
          </View>
        </Camera>
      </View>
    );
  }
  return <></>;
}

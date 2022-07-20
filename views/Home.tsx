import * as React from 'react';
import { View, Image } from 'react-native';
import { Subheading, Button } from 'react-native-paper';
import { HomeProps } from '../navigation';
import { useCamera } from '../providers/CameraProvider';

const DIMENSION = 200;

export function Home({ navigation }: HomeProps) {
  const { image } = useCamera();

  return (
    <View style={{ padding: 10 }}>
      <Subheading>Headline Large</Subheading>
      {image && (
        <Image
          style={{ width: DIMENSION, height: DIMENSION, marginBottom: 10 }}
          height={DIMENSION}
          width={DIMENSION}
          source={{ uri: `data:image/png;base64,${image?.base64}` }}
        />
      )}
      <Button
        icon="camera"
        mode="contained"
        theme={{ roundness: 15 }}
        onPress={() => navigation.push('Camera')}
      >
        Take photo
      </Button>
    </View>
  );
}

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Barcode: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type CameraProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;

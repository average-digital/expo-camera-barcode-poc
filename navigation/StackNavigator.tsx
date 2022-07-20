import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../views/Home';
import CameraView from '../views/Camera';
import BarcodeScanner from '../views/BarcodeScanner';
import { Appbar } from './Appbar';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Appbar {...props} />,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Camera"
        component={CameraView}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Barcode" component={BarcodeScanner} />
    </Stack.Navigator>
  );
}

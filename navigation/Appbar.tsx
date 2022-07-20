import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar as Navbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export function Appbar({ navigation, back, route }: NativeStackHeaderProps) {
  return (
    <Navbar.Header>
      <StatusBar style="light" />
      {back ? <Navbar.BackAction onPress={navigation.goBack} /> : null}
      <Navbar.Content title={route.name} />
      <Navbar.Action
        icon="barcode"
        onPress={() => navigation.push('Barcode')}
      />
      <Navbar.Action icon="camera" onPress={() => navigation.push('Camera')} />
    </Navbar.Header>
  );
}

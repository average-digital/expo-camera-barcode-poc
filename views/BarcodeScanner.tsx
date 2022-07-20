import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { usePermission } from '../hooks/usePermission';

export default function BarcodeScanner() {
  const hasPermission = usePermission('barcode-scanner');
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState('');

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setResult(type + ': ' + data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>{result}</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

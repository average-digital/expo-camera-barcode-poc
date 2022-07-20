import { useEffect, useState } from 'react';
import { Camera, PermissionStatus } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

export function usePermission(permission: 'camera' | 'barcode-scanner') {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function getStatus() {
      let status = PermissionStatus.UNDETERMINED;

      switch (permission) {
        case 'camera':
          const camera = await Camera.requestCameraPermissionsAsync();
          status = camera.status;
          break;
        case 'barcode-scanner':
          const barcode = await BarCodeScanner.requestPermissionsAsync();
          status = barcode.status;
          break;
      }

      setHasPermission(status === PermissionStatus.GRANTED);
    }

    getStatus();
  }, []);

  return hasPermission;
}

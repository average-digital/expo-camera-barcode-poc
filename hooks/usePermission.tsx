import { useEffect, useState } from 'react';
import { Camera, PermissionStatus } from 'expo-camera';

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    }
    getCameraStatus();
  }, []);

  return hasPermission;
}

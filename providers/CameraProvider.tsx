import { CameraCapturedPicture } from 'expo-camera';
import { createContext, useContext, useState } from 'react';

interface ICameraContext {
  image: CameraCapturedPicture | undefined;
  setImage: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined>
  >;
}

const CameraContext = createContext<ICameraContext>({} as ICameraContext);

export const CameraProvider: React.FC<any> = ({ children }) => {
  const [image, setImage] = useState<CameraCapturedPicture | undefined>();
  const context = {
    image,
    setImage,
  };

  return (
    <CameraContext.Provider value={context}>{children}</CameraContext.Provider>
  );
};

export const useCamera = () => useContext(CameraContext);

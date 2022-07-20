import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigation/StackNavigator';
import { CameraProvider } from './providers/CameraProvider';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <CameraProvider>
          <StackNavigator />
        </CameraProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

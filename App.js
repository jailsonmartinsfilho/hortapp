import Routes from "./src/routes";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { UserProvider } from './src/context/UserContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'FibraOneBold': require('@/assets/fonts/FibraOneBold.ttf'),
    'FibraOneRegular': require('@/assets/fonts/FibraOneRegular.ttf'),
    'FibraOneLight': require('@/assets/fonts/FibraOneLight.ttf'),
    'FibraOneMedium': require('@/assets/fonts/FibraOneMedium.ttf'),
    'FibraOneSemiBold': require('@/assets/fonts/FibraOneSemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <UserProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </UserProvider>
  );
}
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

// Screens
import {
  CameraScreen,
  OnBoarding,
  HistoryScreen
} from "./screens/"

// Tabs
import HistoryEditor from './screens/HistoryScreen/HistoryEditor';

const Stack = createStackNavigator();
const App = () => {

  const [fontsLoaded] = Font.useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'OnBoarding'} 
        screenOptions={{
          headerShown: false
        }}>
          
        <Stack.Screen 
          name="OnBoarding" 
          component={OnBoarding} 
          options={{ readerShown: false }}
        />

        { /* Tabs */}
        <Stack.Screen 
          name="CameraScreen"
          component={CameraScreen}
        />
        <Stack.Screen 
          name="HistoryScreen"
          component={HistoryScreen}
        />
        <Stack.Screen 
          name="HistoryEditor"
          component={HistoryEditor}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return <App />;
}
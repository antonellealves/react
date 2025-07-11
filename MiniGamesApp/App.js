import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import MemoryGameScreen from './screens/MemoryGameScreen';
import SnakeGameScreen from './screens/SnakeGameScreen';
import GuessNumberScreen from './screens/GuessNumberScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Mini Jogos' }}
        />
        <Stack.Screen
          name="MemoryGame"
          component={MemoryGameScreen}
          options={{ title: 'Jogo da Memória' }}
        />
        <Stack.Screen
          name="SnakeGame"
          component={SnakeGameScreen}
          options={{ title: 'Jogo da Cobrinha' }}
        />
        <Stack.Screen
          name="GuessNumber"
          component={GuessNumberScreen}
          options={{ title: 'Adivinhe o Número' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

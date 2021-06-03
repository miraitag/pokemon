import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PokemonHomeScreen } from '../screens/PokemonHomeScreen';
import { PokemonDetailScreen } from '../screens/PokemonDetailScreen';
import { PokemonFull } from '../interfaces/pokemon.interface';

export type RootStackParams = {
  PokemonHomeScreen: undefined;
  PokemonDetailScreen: {
    pokemon: PokemonFull,
    color: string
  }
}
const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
        screenOptions= {{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}
    >
      <Stack.Screen name="PokemonHomeScreen" component={ PokemonHomeScreen } />
      <Stack.Screen name="PokemonDetailScreen" component={ PokemonDetailScreen } />
    </Stack.Navigator>
  );
}
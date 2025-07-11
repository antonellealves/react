import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const games = [
    {
      id: 1,
      title: 'Jogo da Memória',
      description: 'Teste sua memória encontrando os pares',
      route: 'MemoryGame',
      color: '#FF6B6B',
    },
    {
      id: 2,
      title: 'Jogo da Cobrinha',
      description: 'Clássico Snake para testar seus reflexos',
      route: 'SnakeGame',
      color: '#4ECDC4',
    },
    {
      id: 3,
      title: 'Adivinhe o Número',
      description: 'Descubra o número secreto',
      route: 'GuessNumber',
      color: '#45B7D1',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>🎮 Mini Jogos 🎮</Text>
          <Text style={styles.subtitle}>Escolha um jogo para começar!</Text>
        </View>

        <View style={styles.gamesContainer}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={[styles.gameCard, { backgroundColor: game.color }]}
              onPress={() => navigation.navigate(game.route)}
            >
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameDescription}>{game.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  gamesContainer: {
    flex: 1,
    gap: 20,
  },
  gameCard: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  gameDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
});
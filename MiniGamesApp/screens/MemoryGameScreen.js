import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';

const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺'];

export default function MemoryGameScreen() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedPairs.length === emojis.length) {
      setGameWon(true);
      Alert.alert(
        'Parabéns! 🎉',
        `Você completou o jogo em ${moves} movimentos!`,
        [{ text: 'Jogar Novamente', onPress: initializeGame }]
      );
    }
  }, [matchedPairs]);

  const initializeGame = () => {
    const duplicatedEmojis = [...emojis, ...emojis];
    const shuffledCards = shuffleArray(duplicatedEmojis).map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
    }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const flipCard = (cardId) => {
    if (flippedCards.length >= 2 || flippedCards.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );
  };

  const checkForMatch = () => {
    const [firstCard, secondCard] = flippedCards;
    const card1 = cards.find(card => card.id === firstCard);
    const card2 = cards.find(card => card.id === secondCard);

    setMoves(prevMoves => prevMoves + 1);

    if (card1.emoji === card2.emoji) {
      setMatchedPairs(prevMatched => [...prevMatched, card1.emoji]);
      setFlippedCards([]);
    } else {
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            flippedCards.includes(card.id) ? { ...card, isFlipped: false } : card
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  };

  const renderCard = ({ item }) => {
    const isMatched = matchedPairs.includes(item.emoji);
    const isFlipped = item.isFlipped || isMatched;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isFlipped && styles.flippedCard,
          isMatched && styles.matchedCard,
        ]}
        onPress={() => flipCard(item.id)}
        disabled={isFlipped || flippedCards.length >= 2}
      >
        <Text style={styles.cardText}>
          {isFlipped ? item.emoji : '❓'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Jogo da Memória</Text>
        <Text style={styles.moves}>Movimentos: {moves}</Text>
      </View>

      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={styles.grid}
      />

      <TouchableOpacity style={styles.resetButton} onPress={initializeGame}>
        <Text style={styles.resetButtonText}>Novo Jogo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  moves: {
    fontSize: 18,
    color: '#666',
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 70,
    height: 70,
    margin: 5,
    backgroundColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flippedCard: {
    backgroundColor: '#fff',
  },
  matchedCard: {
    backgroundColor: '#4CAF50',
  },
  cardText: {
    fontSize: 24,
    color: '#fff',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
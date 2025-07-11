import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';

export default function GuessNumberScreen() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(10);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hint, setHint] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');

  const difficulties = {
    easy: { min: 1, max: 50, attempts: 8 },
    medium: { min: 1, max: 100, attempts: 10 },
    hard: { min: 1, max: 200, attempts: 12 },
  };

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const startNewGame = () => {
    const { min, max, attempts } = difficulties[difficulty];
    const newTarget = Math.floor(Math.random() * (max - min + 1)) + min;
    
    setTargetNumber(newTarget);
    setGuess('');
    setAttempts(0);
    setMaxAttempts(attempts);
    setGameWon(false);
    setGameOver(false);
    setHint(`Pensei em um número entre ${min} e ${max}. Você consegue adivinhar?`);
    setGuessHistory([]);
  };

  const makeGuess = () => {
    const guessNumber = parseInt(guess);
    
    if (isNaN(guessNumber)) {
      Alert.alert('Erro', 'Por favor, digite um número válido!');
      return;
    }

    const { min, max } = difficulties[difficulty];
    if (guessNumber < min || guessNumber > max) {
      Alert.alert('Erro', `O número deve estar entre ${min} e ${max}!`);
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const newGuess = {
      number: guessNumber,
      attempt: newAttempts,
      result: '',
    };

    if (guessNumber === targetNumber) {
      newGuess.result = 'Acertou! 🎉';
      setGameWon(true);
      setGameOver(true);
      setHint(`Parabéns! Você acertou em ${newAttempts} tentativas!`);
      
      setTimeout(() => {
        Alert.alert(
          'Parabéns! 🎉',
          `Você acertou o número ${targetNumber} em ${newAttempts} tentativas!`,
          [
            { text: 'Jogar Novamente', onPress: startNewGame },
          ]
        );
      }, 100);
    } else if (newAttempts >= maxAttempts) {
      newGuess.result = guessNumber > targetNumber ? 'Muito alto ⬆️' : 'Muito baixo ⬇️';
      setGameOver(true);
      setHint(`Fim de jogo! O número era ${targetNumber}.`);
      
      setTimeout(() => {
        Alert.alert(
          'Fim de Jogo!',
          `O número era ${targetNumber}. Você esgotou suas ${maxAttempts} tentativas.`,
          [
            { text: 'Jogar Novamente', onPress: startNewGame },
          ]
        );
      }, 100);
    } else {
      if (guessNumber > targetNumber) {
        newGuess.result = 'Muito alto ⬆️';
        setHint('Tente um número menor!');
      } else {
        newGuess.result = 'Muito baixo ⬇️';
        setHint('Tente um número maior!');
      }
    }

    setGuessHistory(prev => [...prev, newGuess]);
    setGuess('');
  };

  const getDifficultyLabel = () => {
    switch (difficulty) {
      case 'easy':
        return 'Fácil (1-50)';
      case 'medium':
        return 'Médio (1-100)';
      case 'hard':
        return 'Difícil (1-200)';
      default:
        return 'Médio (1-100)';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Adivinhe o Número</Text>
          <Text style={styles.difficulty}>Dificuldade: {getDifficultyLabel()}</Text>
          <Text style={styles.attempts}>
            Tentativas: {attempts}/{maxAttempts}
          </Text>
        </View>

        <View style={styles.difficultySelector}>
          <Text style={styles.sectionTitle}>Selecione a Dificuldade:</Text>
          <View style={styles.difficultyButtons}>
            {Object.keys(difficulties).map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.difficultyButton,
                  difficulty === level && styles.selectedDifficulty,
                ]}
                onPress={() => setDifficulty(level)}
                disabled={gameWon || (attempts > 0 && !gameOver)}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === level && styles.selectedDifficultyText,
                  ]}
                >
                  {level === 'easy' ? 'Fácil' : level === 'medium' ? 'Médio' : 'Difícil'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.gameArea}>
          <Text style={styles.hint}>{hint}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu palpite"
              value={guess}
              onChangeText={setGuess}
              keyboardType="numeric"
              editable={!gameOver}
            />
            <TouchableOpacity
              style={[styles.guessButton, gameOver && styles.disabledButton]}
              onPress={makeGuess}
              disabled={gameOver || !guess.trim()}
            >
              <Text style={styles.guessButtonText}>Tentar</Text>
            </TouchableOpacity>
          </View>

          {guessHistory.length > 0 && (
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>Histórico de Tentativas:</Text>
              <ScrollView style={styles.historyScroll}>
                {guessHistory.map((item, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Text style={styles.historyText}>
                      {item.attempt}. {item.number} - {item.result}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.newGameButton} onPress={startNewGame}>
          <Text style={styles.newGameButtonText}>Novo Jogo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    flexGrow: 1,
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
  difficulty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  attempts: {
    fontSize: 16,
    color: '#666',
  },
  difficultySelector: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  difficultyButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ddd',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedDifficulty: {
    backgroundColor: '#45B7D1',
  },
  difficultyButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  selectedDifficultyText: {
    color: '#fff',
  },
  gameArea: {
    flex: 1,
    alignItems: 'center',
  },
  hint: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  guessButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  guessButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyContainer: {
    width: '100%',
    maxHeight: 200,
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  historyScroll: {
    maxHeight: 150,
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  historyText: {
    fontSize: 14,
    color: '#333',
  },
  newGameButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  newGameButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
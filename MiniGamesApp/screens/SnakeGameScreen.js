import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const BOARD_SIZE = 20;
const CELL_SIZE = (width - 40) / BOARD_SIZE;

export default function SnakeGameScreen() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoop = useRef(null);

  useEffect(() => {
    if (gameRunning && !gameOver) {
      gameLoop.current = setInterval(moveSnake, 150);
    } else {
      clearInterval(gameLoop.current);
    }

    return () => clearInterval(gameLoop.current);
  }, [gameRunning, gameOver, snake, direction]);

  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
  };

  const moveSnake = () => {
    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        Alert.alert('Game Over!', `Sua pontuação: ${score}`, [
          { text: 'Jogar Novamente', onPress: resetGame }
        ]);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        Alert.alert('Game Over!', `Sua pontuação: ${score}`, [
          { text: 'Jogar Novamente', onPress: resetGame }
        ]);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => prevScore + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  const changeDirection = (newDirection) => {
    if (gameRunning && !gameOver) {
      // Prevent reversing
      if (
        (newDirection.x === 1 && direction.x === -1) ||
        (newDirection.x === -1 && direction.x === 1) ||
        (newDirection.y === 1 && direction.y === -1) ||
        (newDirection.y === -1 && direction.y === 1)
      ) {
        return;
      }
      setDirection(newDirection);
    }
  };

  const startGame = () => {
    setGameRunning(true);
    setGameOver(false);
  };

  const pauseGame = () => {
    setGameRunning(false);
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameRunning(false);
    setGameOver(false);
  };

  const renderBoard = () => {
    const board = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        const isHead = snake[0] && snake[0].x === x && snake[0].y === y;

        board.push(
          <View
            key={`${x}-${y}`}
            style={[
              styles.cell,
              isSnake && styles.snakeCell,
              isHead && styles.snakeHead,
              isFood && styles.foodCell,
            ]}
          />
        );
      }
    }
    return board;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Jogo da Cobrinha</Text>
        <Text style={styles.score}>Pontuação: {score}</Text>
      </View>

      <View style={styles.board}>
        {renderBoard()}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.directionButton}
          onPress={() => changeDirection({ x: 0, y: -1 })}
        >
          <Text style={styles.buttonText}>↑</Text>
        </TouchableOpacity>
        
        <View style={styles.horizontalControls}>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => changeDirection({ x: -1, y: 0 })}
          >
            <Text style={styles.buttonText}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => changeDirection({ x: 1, y: 0 })}
          >
            <Text style={styles.buttonText}>→</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.directionButton}
          onPress={() => changeDirection({ x: 0, y: 1 })}
        >
          <Text style={styles.buttonText}>↓</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameControls}>
        <TouchableOpacity
          style={[styles.gameButton, styles.startButton]}
          onPress={gameRunning ? pauseGame : startGame}
        >
          <Text style={styles.gameButtonText}>
            {gameRunning ? 'Pausar' : 'Iniciar'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.gameButton, styles.resetButton]}
          onPress={resetGame}
        >
          <Text style={styles.gameButtonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
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
  score: {
    fontSize: 18,
    color: '#666',
  },
  board: {
    width: BOARD_SIZE * CELL_SIZE,
    height: BOARD_SIZE * CELL_SIZE,
    backgroundColor: '#333',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginBottom: 20,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#333',
    borderWidth: 0.5,
    borderColor: '#555',
  },
  snakeCell: {
    backgroundColor: '#4CAF50',
  },
  snakeHead: {
    backgroundColor: '#2E7D32',
  },
  foodCell: {
    backgroundColor: '#FF5722',
  },
  controls: {
    alignItems: 'center',
    marginBottom: 20,
  },
  horizontalControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    marginVertical: 10,
  },
  directionButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2196F3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gameControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gameButton: {
    padding: 15,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
  },
  gameButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
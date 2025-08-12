import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';


const getRandomNumber = (min = 1, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MysteryNumberGame: React.FC = () => {
  const [target, setTarget] = useState<number>(() => getRandomNumber());
  const [guessText, setGuessText] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);

  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    // Reset feedback whenever guess text changes
    if (!guessText) setFeedback('');
  }, [guessText]);

  const handleGuess = () => {
    const guess = parseInt(guessText.trim(), 10);
    if (Number.isNaN(guess)) {
      Alert.alert('Invalid input', 'Please enter a number between 1 and 100.');
      return;
    }
    if (guess < 1 || guess > 100) {
      Alert.alert('Out of range', 'Guess must be between 1 and 100.');
      return;
    }

    setAttempts(prev => prev + 1);

    if (guess === target) {
      setFeedback("Congratulations! You've guessed the correct number!");
      setGameOver(true);
      inputRef.current?.blur();
    } else if (guess < target) {
      setFeedback('Too low! Try again.');
    } else {
      setFeedback('Too high! Try again.');
    }
  };

  const handleRestart = () => {
    setTarget(getRandomNumber());
    setGuessText('');
    setAttempts(0);
    setFeedback('');
    setGameOver(false);
    
    setTimeout(() => inputRef.current?.focus(), 250);
  };

  const handleQuickHint = () => {
    Alert.alert('Hint', `The number is between ${Math.max(1, target - 10)} and ${Math.min(100, target + 10)}.`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Mystery Number Game</Text>

          <Text style={styles.instructions}>
            Guess the number between 1 and 100.
          </Text>

          <TextInput
            ref={inputRef}
            style={styles.input}
            value={guessText}
            onChangeText={setGuessText}
            placeholder="Enter your guess"
            keyboardType="number-pad"
            maxLength={3}
            editable={!gameOver}
            returnKeyType="done"
            onSubmitEditing={handleGuess}
            accessible
            accessibilityLabel="Guess input"
          />

          <TouchableOpacity
            style={[styles.button, gameOver && styles.buttonDisabled]}
            onPress={handleGuess}
            disabled={gameOver}
            accessibilityLabel="Submit guess"
          >
            <Text style={styles.buttonText}>Guess</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.attempts}>Attempts: {attempts}</Text>
            <TouchableOpacity onPress={handleQuickHint} style={styles.hintButton}>
              <Text style={styles.hintText}>Hint</Text>
            </TouchableOpacity>
          </View>

          {!!feedback && (
            <View
              style={[
                styles.feedbackBox,
                feedback.startsWith('Too low') && styles.tooLow,
                feedback.startsWith('Too high') && styles.tooHigh,
                feedback.startsWith("Congratulations") && styles.correct,
              ]}
            >
              <Text style={styles.feedbackText}>{feedback}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.restartButton} onPress={handleRestart} accessibilityLabel="Restart game">
            <Text style={styles.restartText}>Restart Game</Text>
          </TouchableOpacity>

          {gameOver && (
            <Text style={styles.reveal}>The number was: {target}</Text>
          )}
        </View>

        <Text style={styles.footer}>Good luck — try to beat your previous best!</Text>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MysteryNumberGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 14,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.select({ ios: 12, android: 8 }),
    fontSize: 18,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  attempts: {
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  hintButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
  },
  hintText: {
    fontSize: 14,
  },
  feedbackBox: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  tooLow: {
    backgroundColor: '#e0f2fe',
    borderColor: '#93c5fd',
  },
  tooHigh: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },
  correct: {
    backgroundColor: '#dcfce7',
    borderColor: '#86efac',
  },
  restartButton: {
    marginTop: 6,
    alignItems: 'center',
    paddingVertical: 10,
  },
  restartText: {
    color: '#374151',
    fontWeight: '600',
  },
  reveal: {
    marginTop: 10,
    textAlign: 'center',
    color: '#111827',
    fontWeight: '600',
  },
  footer: {
    marginTop: 18,
    color: '#6b7280',
  },
});

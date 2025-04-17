import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (num === '.' && display.includes('.')) return;
    
    if (newNumber) {
      setDisplay(num === '.' ? '0.' : num);
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op: string) => {
    setOperation(op);
    setFirstNumber(display);
    setNewNumber(true);
  };

  const calculate = () => {
    if (!operation || !firstNumber) return;
    
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        result = num1 / num2;
        break;
    }

    setDisplay(result.toString());
    setOperation('');
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setFirstNumber('');
    setOperation('');
    setNewNumber(true);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.display}>
        <ThemedText style={styles.displayText}>{display}</ThemedText>
      </ThemedView>

      <View style={styles.buttons}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clear}>
            <ThemedText style={styles.buttonText}>C</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperation('÷')}>
            <ThemedText style={styles.buttonText}>÷</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperation('×')}>
            <ThemedText style={styles.buttonText}>×</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperation('-')}>
            <ThemedText style={styles.buttonText}>-</ThemedText>
          </TouchableOpacity>
        </View>

        {[
          ['7', '8', '9', '+'],
          ['4', '5', '6', '='],
          ['1', '2', '3', '0'],
          ['.', '⌫', '^'], // Added some missing functions for example
        ].map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  btn === '0' && styles.doubleWidth,
                  ['+', '-', '×', '÷', '='].includes(btn) && styles.operatorButton,
                  btn === 'C' && styles.clearButton,
                ]}
                onPress={() => {
                  if (btn === '=') calculate();
                  else if (['+', '-', '×', '÷'].includes(btn)) handleOperation(btn);
                  else handleNumber(btn);
                }}>
                <ThemedText style={styles.buttonText}>{btn}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  display: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 64,
    color: '#fff',
    fontWeight: '300',
  },
  buttons: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4a4a4a',
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    flex: 1,
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  clearButton: {
    backgroundColor: '#ff3b30',
  },
  doubleWidth: {
    flex: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '500',
  },
});
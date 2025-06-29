import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';

export default function HomeScreen() {
  const [coins, setCoins] = useState(0);
  const [fontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>🪙 {coins}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setCoins(coins + 1)}>
        <Text style={styles.buttonText}>Play Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinContainer: {
    position: 'absolute',
    top: 60,
    right: 30,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  coinText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#222',
  },
  button: {
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#FF5A5F',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontSize: 22,
    color: '#fff',
    letterSpacing: 1,
  },
});

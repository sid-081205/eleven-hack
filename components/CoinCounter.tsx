import { View, Text, StyleSheet } from 'react-native';
import { Coins } from 'lucide-react-native';

interface CoinCounterProps {
  coins: number;
}

export default function CoinCounter({ coins }: CoinCounterProps) {
  return (
    <View style={styles.coinContainer}>
      <Coins size={20} color="#ffd700" />
      <Text style={styles.coinText}>{coins.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  coinContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffd700',
    zIndex: 1000,
  },
  coinText: {
    fontFamily: 'PressStart2P',
    fontSize: 12,
    color: '#ffd700',
    marginLeft: 8,
    textShadowColor: '#b8860b',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
});
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { X, Code, Database, TestTube, Palette, Shield, Zap, Coins } from 'lucide-react-native';

interface Upgrade {
  id: string;
  name: string;
  cost: number;
  icon: React.ReactNode;
  description: string;
}

interface HackerUpgradeModalProps {
  visible: boolean;
  onClose: () => void;
  onUpgrade: (upgrade: Upgrade) => void;
  onGetMoreCoins: () => void;
  hackerName: string;
  hackerType: string;
  coins: number;
}

const upgrades: Upgrade[] = [
  {
    id: 'frontend',
    name: 'Build Frontend',
    cost: 500,
    icon: <Palette size={16} color="#ff6b6b" />,
    description: 'Create beautiful UIs'
  },
  {
    id: 'backend',
    name: 'Build Backend',
    cost: 500,
    icon: <Database size={16} color="#4ecdc4" />,
    description: 'Handle server logic'
  },
  {
    id: 'testing',
    name: 'Do Testing',
    cost: 500,
    icon: <TestTube size={16} color="#45b7d1" />,
    description: 'Ensure code quality'
  },
  {
    id: 'security',
    name: 'Security Audit',
    cost: 500,
    icon: <Shield size={16} color="#f39c12" />,
    description: 'Protect from threats'
  },
  {
    id: 'optimization',
    name: 'Optimize Code',
    cost: 500,
    icon: <Zap size={16} color="#e74c3c" />,
    description: 'Boost performance'
  },
  {
    id: 'debugging',
    name: 'Debug Issues',
    cost: 500,
    icon: <Code size={16} color="#9b59b6" />,
    description: 'Fix those pesky bugs'
  },
];

export default function HackerUpgradeModal({ 
  visible, 
  onClose, 
  onUpgrade, 
  onGetMoreCoins,
  hackerName,
  hackerType, 
  coins 
}: HackerUpgradeModalProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const coinButtonAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      // Pulsing animation for the coin button
      const coinPulse = Animated.loop(
        Animated.sequence([
          Animated.timing(coinButtonAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(coinButtonAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      coinPulse.start();

      return () => {
        coinPulse.stop();
      };
    } else {
      scaleAnim.setValue(0);
      coinButtonAnim.setValue(1);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.modal, 
            { 
              transform: [{ scale: scaleAnim }],
            }
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>UPGRADE {hackerName.toUpperCase()}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={16} color="#00ff00" />
            </TouchableOpacity>
          </View>

          <Text style={styles.hackerInfo}>
            {hackerName} • {hackerType.toUpperCase()} SPECIALIST
          </Text>
          <Text style={styles.coinDisplay}>Your Coins: {coins}</Text>

          <View style={styles.upgradesContainer}>
            {upgrades.map((upgrade) => {
              const canAfford = coins >= upgrade.cost;
              return (
                <TouchableOpacity
                  key={upgrade.id}
                  style={[
                    styles.upgradeButton,
                    !canAfford && styles.upgradeButtonDisabled
                  ]}
                  onPress={() => canAfford && onUpgrade(upgrade)}
                  disabled={!canAfford}
                >
                  <View style={styles.upgradeIcon}>
                    {upgrade.icon}
                  </View>
                  <View style={styles.upgradeInfo}>
                    <Text style={[styles.upgradeName, !canAfford && styles.disabledText]}>
                      {upgrade.name}
                    </Text>
                    <Text style={[styles.upgradeDescription, !canAfford && styles.disabledText]}>
                      {upgrade.description}
                    </Text>
                  </View>
                  <Text style={[styles.upgradeCost, !canAfford && styles.disabledText]}>
                    {upgrade.cost}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>All upgrades cost 500 coins!</Text>
            
            {/* Get More Coins Button */}
            <Animated.View style={{ transform: [{ scale: coinButtonAnim }] }}>
              <TouchableOpacity 
                style={styles.getCoinsButton} 
                onPress={onGetMoreCoins}
              >
                <Coins size={16} color="#ffd700" />
                <Text style={styles.getCoinsText}>GET MORE COINS</Text>
                <Text style={styles.getCoinsSubtext}>+1000 COINS</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1a1a1a',
    borderWidth: 3,
    borderColor: '#00ff00',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 12,
    color: '#00ff00',
    textShadowColor: '#004400',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#2a2a2a',
    padding: 8,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  hackerInfo: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    color: '#888888',
    marginBottom: 10,
    textAlign: 'center',
  },
  coinDisplay: {
    fontFamily: 'PressStart2P',
    fontSize: 10,
    color: '#ffd700',
    marginBottom: 20,
    textAlign: 'center',
  },
  upgradesContainer: {
    gap: 10,
    maxHeight: 300,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderWidth: 2,
    borderColor: '#444444',
    padding: 12,
    borderRadius: 4,
  },
  upgradeButtonDisabled: {
    opacity: 0.5,
    borderColor: '#222222',
  },
  upgradeIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#555555',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  upgradeInfo: {
    flex: 1,
  },
  upgradeName: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    color: '#00ff00',
    marginBottom: 4,
  },
  upgradeDescription: {
    fontFamily: 'PressStart2P',
    fontSize: 6,
    color: '#888888',
  },
  upgradeCost: {
    fontFamily: 'PressStart2P',
    fontSize: 10,
    color: '#ffd700',
  },
  disabledText: {
    color: '#444444',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'PressStart2P',
    fontSize: 6,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 15,
  },
  getCoinsButton: {
    backgroundColor: '#2a2a2a',
    borderWidth: 3,
    borderColor: '#ffd700',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    borderRadius: 4,
  },
  getCoinsText: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    color: '#ffd700',
    textShadowColor: '#b8860b',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  getCoinsSubtext: {
    fontFamily: 'PressStart2P',
    fontSize: 6,
    color: '#ffff00',
    marginLeft: 8,
  },
});
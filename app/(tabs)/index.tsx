import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import CoinCounter from '@/components/CoinCounter';

export default function HomePage() {
  const router = useRouter();
  const [coins] = useState(0); // Start with 0 coins
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulsing animation for the title
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Floating animation for decorative elements
    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // Sparkle animation
    const sparkle = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
    float.start();
    sparkle.start();

    return () => {
      pulse.stop();
      float.stop();
      sparkle.stop();
    };
  }, []);

  const handlePlayGame = () => {
    router.push('/game');
  };

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      {/* Sky Background */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460', '#533483']}
        style={styles.skyBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Floating Clouds */}
      <Animated.View style={[styles.cloud, styles.cloud1, { transform: [{ translateY: floatY }] }]}>
        <Text style={styles.cloudText}>☁</Text>
      </Animated.View>
      <Animated.View style={[styles.cloud, styles.cloud2, { transform: [{ translateY: floatY }] }]}>
        <Text style={styles.cloudText}>☁</Text>
      </Animated.View>
      <Animated.View style={[styles.cloud, styles.cloud3, { transform: [{ translateY: floatY }] }]}>
        <Text style={styles.cloudText}>☁</Text>
      </Animated.View>

      {/* Stars */}
      <Animated.View style={[styles.star, styles.star1, { opacity: sparkleOpacity }]}>
        <Text style={styles.starText}>✦</Text>
      </Animated.View>
      <Animated.View style={[styles.star, styles.star2, { opacity: sparkleOpacity }]}>
        <Text style={styles.starText}>✧</Text>
      </Animated.View>
      <Animated.View style={[styles.star, styles.star3, { opacity: sparkleOpacity }]}>
        <Text style={styles.starText}>✦</Text>
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        {/* Coin Counter */}
        <CoinCounter coins={coins} />

        {/* Main Content */}
        <View style={styles.content}>
          <Animated.View style={[styles.titleContainer, { transform: [{ scale: pulseAnim }] }]}>
            <Text style={styles.title}>HACKER</Text>
            <Text style={styles.title}>HOUSE</Text>
            <View style={styles.titleGlow} />
          </Animated.View>

          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>CYBER OFFICE SIM</Text>
            <Text style={styles.version}>v2.0 ENHANCED</Text>
          </View>

          <View style={styles.buttonGlow}>
            <TouchableOpacity style={styles.playButton} onPress={handlePlayGame}>
              <Text style={styles.buttonText}>PLAY GAME</Text>
              <View style={styles.buttonDecor}>
                <Text style={styles.buttonArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Enhanced ASCII Art */}
          <View style={styles.asciiContainer}>
            <Text style={styles.ascii}>{'>'} LOADING MATRIX...</Text>
            <Text style={styles.ascii}>{'>'} INITIALIZING HACK.EXE</Text>
            <Text style={styles.ascii}>{'>'} READY TO INFILTRATE</Text>
            <Text style={styles.ascii}>{'>'} WELCOME TO THE FUTURE</Text>
          </View>
        </View>

        {/* Bottom decoration */}
        <View style={styles.bottomDecor}>
          <Text style={styles.decorText}>████ HACKER HOUSE ████</Text>
          <Text style={styles.decorSubtext}>Build • Code • Conquer</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skyBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  cloud: {
    position: 'absolute',
  },
  cloud1: {
    top: 80,
    left: 50,
  },
  cloud2: {
    top: 120,
    right: 80,
  },
  cloud3: {
    top: 200,
    left: 200,
  },
  cloudText: {
    fontSize: 30,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  star: {
    position: 'absolute',
  },
  star1: {
    top: 100,
    left: 100,
  },
  star2: {
    top: 150,
    right: 150,
  },
  star3: {
    top: 250,
    left: 300,
  },
  starText: {
    fontSize: 20,
    color: '#ffd700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  title: {
    fontFamily: 'PressStart2P',
    fontSize: 32,
    color: '#00ff00',
    textAlign: 'center',
    textShadowColor: '#004400',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    lineHeight: 40,
  },
  titleGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    borderRadius: 8,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontFamily: 'PressStart2P',
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 8,
  },
  version: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    color: '#666666',
    textAlign: 'center',
  },
  buttonGlow: {
    elevation: 20,
  },
  playButton: {
    backgroundColor: '#1a1a1a',
    borderWidth: 3,
    borderColor: '#00ff00',
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 40,
    flexDirection: 'row',
    position: 'relative',
  },
  buttonText: {
    fontFamily: 'PressStart2P',
    fontSize: 16,
    color: '#00ff00',
    textShadowColor: '#004400',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  buttonDecor: {
    marginLeft: 15,
  },
  buttonArrow: {
    fontFamily: 'PressStart2P',
    fontSize: 16,
    color: '#00ff00',
  },
  asciiContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
  },
  ascii: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    color: '#00aa00',
    marginBottom: 4,
  },
  bottomDecor: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  decorText: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    color: '#333333',
    marginBottom: 4,
  },
  decorSubtext: {
    fontFamily: 'PressStart2P',
    fontSize: 6,
    color: '#222222',
  },
});
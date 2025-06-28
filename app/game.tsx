import { View, Text, StyleSheet, SafeAreaView, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Zap, Coffee, Code, Monitor, Cpu, Database } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CoinCounter from '@/components/CoinCounter';
import HackerUpgradeModal from '@/components/HackerUpgradeModal';
import SurveyChat from '@/components/SurveyChat';

interface Hacker {
  id: number;
  name: string;
  x: number;
  y: number;
  startX: number;
  type: 'coding' | 'debugging' | 'coffee' | 'thinking' | 'designing';
  animOffset: number;
  level: number;
  isWorking: boolean;
  hasWalked: boolean;
  color: string;
}

export default function GamePage() {
  const router = useRouter();
  const [coins, setCoins] = useState(0);
  const [selectedHacker, setSelectedHacker] = useState<Hacker | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSurveyChat, setShowSurveyChat] = useState(false);
  const [hackers, setHackers] = useState<Hacker[]>([
    { 
      id: 1, 
      name: 'Louis', 
      x: 60, 
      y: 120, 
      startX: -80, 
      type: 'coding', 
      animOffset: 0, 
      level: 1, 
      isWorking: true,
      hasWalked: false,
      color: '#00ff00'
    },
    { 
      id: 2, 
      name: 'Sam', 
      x: 220, 
      y: 140, 
      startX: -80, 
      type: 'debugging', 
      animOffset: 500, 
      level: 1, 
      isWorking: false,
      hasWalked: false,
      color: '#ff6600'
    },
    { 
      id: 4, 
      name: 'Jordan', 
      x: 140, 
      y: 220, 
      startX: -80, 
      type: 'thinking', 
      animOffset: 1000, 
      level: 1, 
      isWorking: true,
      hasWalked: false,
      color: '#ff69b4'
    },
    { 
      id: 5, 
      name: 'Riley', 
      x: 300, 
      y: 240, 
      startX: -80, 
      type: 'designing', 
      animOffset: 1500, 
      level: 1, 
      isWorking: false,
      hasWalked: false,
      color: '#9b59b6'
    },
  ]);

  // Separate animated values for each hacker's position
  const hackerPositions = useRef(
    hackers.map(() => new Animated.Value(-80))
  ).current;

  const floatAnim = useRef(new Animated.Value(0)).current;
  const workAnim = useRef(new Animated.Value(0)).current;
  const bobAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start walking animations for all hackers
    const walkAnimations = hackers.map((hacker, index) => {
      return Animated.timing(hackerPositions[index], {
        toValue: hacker.x,
        duration: 2000 + (index * 300),
        delay: index * 200,
        useNativeDriver: false, // Position animations need false
      });
    });

    // Start all walking animations
    Animated.stagger(200, walkAnimations).start(() => {
      // Mark all hackers as having walked
      setHackers(prev => prev.map(h => ({ ...h, hasWalked: true })));
    });

    // Floating animation for hackers (using native driver)
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

    // Work animation for active hackers (using native driver)
    const work = Animated.loop(
      Animated.sequence([
        Animated.timing(workAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(workAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Bobbing animation for walking (using native driver)
    const bob = Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bobAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    );

    float.start();
    work.start();
    bob.start();

    return () => {
      float.stop();
      work.stop();
      bob.stop();
    };
  }, []);

  const handleHackerPress = (hacker: Hacker) => {
    if (hacker.hasWalked) {
      setSelectedHacker(hacker);
      setShowUpgradeModal(true);
    }
  };

  const handleUpgrade = (upgrade: any) => {
    if (coins >= upgrade.cost && selectedHacker) {
      setCoins(prev => prev - upgrade.cost);
      setHackers(prev => prev.map(h => 
        h.id === selectedHacker.id 
          ? { ...h, level: h.level + 1, isWorking: true }
          : h
      ));
      setShowUpgradeModal(false);
      setSelectedHacker(null);
    }
  };

  const handleGetMoreCoins = () => {
    setShowUpgradeModal(false);
    setSelectedHacker(null);
    setShowSurveyChat(true);
  };

  const handleSurveyComplete = (earnedCoins: number) => {
    setCoins(prev => prev + earnedCoins);
    setShowSurveyChat(false);
  };

  const handleSurveyClose = () => {
    setShowSurveyChat(false);
  };

  const renderPixelHacker = (hacker: Hacker, index: number) => {
    const translateY = floatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -3],
    });

    const workScale = workAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
    });

    const bobY = bobAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -2],
    });

    return (
      <TouchableOpacity
        key={hacker.id}
        onPress={() => handleHackerPress(hacker)}
        style={[
          styles.hackerTouchable,
          {
            top: hacker.y,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.hackerContainer,
            {
              left: hacker.hasWalked ? hacker.x : hackerPositions[index],
            },
          ]}
        >
          <Animated.View
            style={{
              transform: [
                { translateY: hacker.hasWalked ? translateY : bobY },
                { scale: hacker.isWorking && hacker.hasWalked ? workScale : 1 }
              ],
            }}
          >
            {/* Pixel Hacker Character */}
            <View style={styles.pixelHacker}>
              {/* Hat */}
              <View style={styles.pixelRow}>
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
              </View>
              
              {/* Head Row 1 */}
              <View style={styles.pixelRow}>
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFDBAC' }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFDBAC' }]} />
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
              </View>
              
              {/* Head Row 2 - Eyes */}
              <View style={styles.pixelRow}>
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
                <View style={[styles.pixel, { backgroundColor: '#000000' }]} />
                <View style={[styles.pixel, { backgroundColor: '#000000' }]} />
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
              </View>
              
              {/* Head Row 3 - Mouth */}
              <View style={styles.pixelRow}>
                <View style={[styles.pixel, { backgroundColor: '#FFDBAC' }]} />
                <View style={[styles.pixel, { backgroundColor: '#000000' }]} />
                <View style={[styles.pixel, { backgroundColor: '#000000' }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFDBAC' }]} />
              </View>
              
              {/* Body Row 1 */}
              <View style={styles.pixelRow}>
                <View style={[styles.pixel, { backgroundColor: '#FFFFFF' }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFFFFF' }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFFFFF' }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFFFFF' }]} />
              </View>
              
              {/* Body Row 2 */}
              <View style={styles.pixelRow}>
                <View style={[styles.pixel, { backgroundColor: '#FFFFFF' }]} />
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFFFFF' }]} />
              </View>
              
              {/* Arms */}
              <View style={styles.pixelRow}>
                <View style={[styles.pixel, { backgroundColor: '#FFDBAC' }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFFFFF' }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFFFFF' }]} />
                <View style={[styles.pixel, { backgroundColor: '#FFDBAC' }]} />
              </View>
              
              {/* Legs */}
              <View style={styles.pixelRow}>
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
                <View style={[styles.pixel, { backgroundColor: 'transparent' }]} />
                <View style={[styles.pixel, { backgroundColor: 'transparent' }]} />
                <View style={[styles.pixel, { backgroundColor: hacker.color }]} />
              </View>
              
              {/* Feet */}
              <View style={styles.pixelRow}>
                <View style={[styles.pixel, { backgroundColor: '#8B4513' }]} />
                <View style={[styles.pixel, { backgroundColor: 'transparent' }]} />
                <View style={[styles.pixel, { backgroundColor: 'transparent' }]} />
                <View style={[styles.pixel, { backgroundColor: '#8B4513' }]} />
              </View>

              {/* Level Badge */}
              {hacker.level > 1 && (
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{hacker.level}</Text>
                </View>
              )}
            </View>

            {/* Name Tag */}
            <View style={styles.nameTag}>
              <Text style={styles.nameText}>{hacker.name}</Text>
            </View>

            {/* Shadow */}
            <View style={styles.hackerShadow} />
            
            {/* Work Indicator */}
            {hacker.isWorking && hacker.hasWalked && (
              <View style={styles.workIndicator}>
                <Text style={styles.workText}>WORKING</Text>
              </View>
            )}

            {/* Walking Indicator */}
            {!hacker.hasWalked && (
              <View style={styles.walkIndicator}>
                <Text style={styles.walkText}>WALKING...</Text>
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderDesk = (x: number, y: number, id: number) => (
    <View key={`desk-${id}`} style={[styles.desk, { left: x, top: y }]}>
      <View style={styles.deskTop} />
      <View style={styles.monitor}>
        <View style={styles.screen} />
      </View>
      <View style={styles.keyboard} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sky Background */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460', '#533483']}
        style={styles.skyBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Coin Counter */}
        <CoinCounter coins={coins} />

        {/* Header - Simplified without title */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={16} color="#00ff00" />
            <Text style={styles.backText}>BACK</Text>
          </TouchableOpacity>
          <View style={styles.statusIndicator}>
            <Text style={styles.statusText}>ONLINE</Text>
          </View>
        </View>

        {/* Game Area */}
        <ScrollView 
          style={styles.gameArea}
          contentContainerStyle={styles.gameContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* Office Floor */}
          <View style={styles.office}>
            {/* Floor Pattern */}
            <View style={styles.floorPattern} />
            
            {/* Office Walls */}
            <View style={styles.wallTop} />
            <View style={styles.wallLeft} />
            <View style={styles.wallRight} />
            <View style={styles.wallBottom} />
            
            {/* Desks - Removed Maya's desk */}
            {renderDesk(40, 100, 1)}
            {renderDesk(200, 120, 2)}
            {renderDesk(120, 200, 4)}
            {renderDesk(280, 220, 5)}

            {/* Pixel Hackers */}
            {hackers.map((hacker, index) => renderPixelHacker(hacker, index))}

            {/* Office Decorations */}
            <View style={[styles.plant, { left: 20, top: 20 }]} />
            <View style={[styles.plant, { right: 20, top: 30 }]} />
            <View style={[styles.server, { left: 10, top: 300 }]} />
            <View style={[styles.server, { right: 10, top: 280 }]} />
          </View>

          {/* Activity Log */}
          <View style={styles.activityLog}>
            <Text style={styles.logTitle}>ACTIVITY LOG</Text>
            <Text style={styles.logEntry}>{'>'} Cute pixel hackers are walking to their desks...</Text>
            <Text style={styles.logEntry}>{'>'} Louis, Sam, Jordan & Riley are ready!</Text>
            <Text style={styles.logEntry}>{'>'} Click on hackers after they reach their desks</Text>
            <Text style={styles.logEntry}>{'>'} Each upgrade costs 500 coins</Text>
            <Text style={styles.logEntry}>{'>'} Choose from 6 different upgrades</Text>
          </View>
        </ScrollView>

        {/* Upgrade Modal */}
        <HackerUpgradeModal
          visible={showUpgradeModal}
          onClose={() => {
            setShowUpgradeModal(false);
            setSelectedHacker(null);
          }}
          onUpgrade={handleUpgrade}
          onGetMoreCoins={handleGetMoreCoins}
          hackerName={selectedHacker?.name || ''}
          hackerType={selectedHacker?.type || ''}
          coins={coins}
        />

        {/* Survey Chat Modal */}
        <SurveyChat
          visible={showSurveyChat}
          onClose={handleSurveyClose}
          onComplete={handleSurveyComplete}
          louisPosition={hackers.find(h => h.name === 'Louis')}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderBottomWidth: 2,
    borderBottomColor: '#00ff00',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  backText: {
    fontFamily: 'PressStart2P',
    fontSize: 8,
    color: '#00ff00',
    marginLeft: 8,
  },
  statusIndicator: {
    backgroundColor: '#004400',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  statusText: {
    fontFamily: 'PressStart2P',
    fontSize: 6,
    color: '#00ff00',
  },
  gameArea: {
    flex: 1,
  },
  gameContent: {
    minHeight: 600,
  },
  office: {
    height: 400,
    backgroundColor: 'rgba(42, 42, 42, 0.8)',
    margin: 10,
    borderWidth: 2,
    borderColor: '#444444',
    position: 'relative',
    overflow: 'hidden',
  },
  floorPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(42, 42, 42, 0.6)',
  },
  wallTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#666666',
  },
  wallLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#666666',
  },
  wallRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#666666',
  },
  wallBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#666666',
  },
  desk: {
    position: 'absolute',
    width: 60,
    height: 40,
  },
  deskTop: {
    width: 60,
    height: 30,
    backgroundColor: '#8B4513',
    borderWidth: 1,
    borderColor: '#654321',
  },
  monitor: {
    position: 'absolute',
    top: 5,
    left: 15,
    width: 20,
    height: 15,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  screen: {
    width: 16,
    height: 11,
    backgroundColor: '#004400',
    margin: 2,
  },
  keyboard: {
    position: 'absolute',
    top: 22,
    left: 20,
    width: 15,
    height: 5,
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#555555',
  },
  hackerTouchable: {
    position: 'absolute',
    padding: 15,
  },
  hackerContainer: {
    alignItems: 'center',
    position: 'absolute',
  },
  pixelHacker: {
    alignItems: 'center',
    position: 'relative',
  },
  pixelRow: {
    flexDirection: 'row',
  },
  pixel: {
    width: 6,
    height: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  levelBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 16,
    height: 16,
    backgroundColor: '#ffd700',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#b8860b',
  },
  levelText: {
    fontFamily: 'PressStart2P',
    fontSize: 6,
    color: '#000000',
  },
  nameTag: {
    marginTop: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  nameText: {
    fontFamily: 'PressStart2P',
    fontSize: 6,
    color: '#00ff00',
  },
  hackerShadow: {
    width: 24,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginTop: 2,
    borderRadius: 2,
  },
  workIndicator: {
    marginTop: 4,
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  workText: {
    fontFamily: 'PressStart2P',
    fontSize: 4,
    color: '#00ff00',
  },
  walkIndicator: {
    marginTop: 4,
    backgroundColor: 'rgba(255, 255, 0, 0.2)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ffff00',
  },
  walkText: {
    fontFamily: 'PressStart2P',
    fontSize: 4,
    color: '#ffff00',
  },
  plant: {
    position: 'absolute',
    width: 16,
    height: 20,
    backgroundColor: '#228B22',
    borderWidth: 1,
    borderColor: '#006400',
  },
  server: {
    position: 'absolute',
    width: 20,
    height: 30,
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#555555',
  },
  activityLog: {
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    margin: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: '#00ff00',
  },
  logTitle: {
    fontFamily: 'PressStart2P',
    fontSize: 10,
    color: '#00ff00',
    marginBottom: 10,
  },
  logEntry: {
    fontFamily: 'PressStart2P',
    fontSize: 6,
    color: '#00aa00',
    marginBottom: 4,
  },
});
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Animated, 
  ScrollView,
  Dimensions,
  Platform 
} from 'react-native';
import { X, Volume2, VolumeX } from 'lucide-react-native';

interface SurveyChatProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (coins: number) => void;
  louisPosition?: { x: number; y: number; color: string } | null;
}

interface Question {
  text: string;
  options: string[];
}

interface SurveyData {
  surveyId: string;
  questions: Question[];
  character: {
    name: string;
    greeting: string;
  };
  reward: {
    amount: number;
  };
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SurveyChat({ visible, onClose, onComplete, louisPosition }: SurveyChatProps) {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for greeting
  const [messages, setMessages] = useState<Array<{id: string, text: string, isUser: boolean, timestamp: Date}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [serverConnected, setServerConnected] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [completionAudio, setCompletionAudio] = useState<HTMLAudioElement | null>(null);
  
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const louisTravelAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (visible) {
      checkServerConnection();
      startSurvey();
      
      // Start Louis traveling animation first
      Animated.timing(louisTravelAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        // Only show chat after Louis reaches the final position
        setChatVisible(true);
        
        // Animate modal slide up
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          })
        ]).start();
      });
    } else {
      // Reset animations and stop any playing audio
      slideAnim.setValue(screenHeight);
      louisTravelAnim.setValue(0);
      fadeAnim.setValue(0);
      setMessages([]);
      setCurrentQuestionIndex(-1);
      setSurveyData(null);
      setServerConnected(false);
      setChatVisible(false);
      setSurveyCompleted(false);
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }
      if (completionAudio) {
        completionAudio.pause();
        setCompletionAudio(null);
      }
    }
  }, [visible]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Add greeting message when survey data and server connection are ready
  useEffect(() => {
    if (surveyData && serverConnected && messages.length === 0 && !isLoading) {
      console.log('🎯 Adding greeting message after server connection confirmed');
      addMessage(surveyData.character.greeting, false, false);
    }
  }, [surveyData, serverConnected, messages.length, isLoading]);

  const getApiUrl = () => {
    if (Platform.OS === 'web') {
      return 'http://localhost:3000';
    }
    // For mobile, use your Mac's IP address so your phone can reach the server
    return 'http://10.234.135.130:3000'; // <-- Replace with your actual Mac IP if different
  };

  const checkServerConnection = async () => {
    try {
      const apiUrl = getApiUrl();
      console.log('🔍 Checking server connection:', apiUrl);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${apiUrl}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const health = await response.json();
        console.log('✅ Server health:', health);
        setServerConnected(true);
      } else {
        console.log('❌ Server health check failed:', response.status);
        setServerConnected(false);
      }
    } catch (error) {
      console.error('❌ Server connection failed:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('❌ Connection timed out after 10 seconds');
      }
      setServerConnected(false);
    }
  };

  const startSurvey = async () => {
    try {
      setIsLoading(true);
      
      const apiUrl = getApiUrl();
      console.log('🚀 Starting survey with API URL:', apiUrl);
      
      // Test server connection first and set the state
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const healthResponse = await fetch(`${apiUrl}/health`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (healthResponse.ok) {
          const health = await healthResponse.json();
          console.log('✅ Server health check passed:', health);
          setServerConnected(true);
        } else {
          console.log('❌ Server health check failed');
          setServerConnected(false);
        }
      } catch (error) {
        console.error('❌ Server health check error:', error);
        if (error instanceof Error && error.name === 'AbortError') {
          console.error('❌ Health check timed out after 10 seconds');
        }
        setServerConnected(false);
      }
      
      // Call actual API
      const response = await fetch(`${apiUrl}/api/v1/survey/request`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userId: 'player_123',
          gameId: 'hacker_house',
          rewardAmount: 500
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiSurveyData = await response.json();
      console.log('📋 Survey data received:', apiSurveyData);
      
      // Transform API response to match our interface
      const transformedData: SurveyData = {
        surveyId: apiSurveyData.surveyId,
        questions: apiSurveyData.questions,
        character: {
          name: "Louis",
          greeting: "Hey there! 👋 I'm Louis, your AI survey assistant! I'm here to ask you a few basic questions and I'd really love to get your honest answers. It's super quick and you'll earn some awesome coins! Are you ready to help me out?"
        },
        reward: {
          amount: apiSurveyData.reward.amount
        }
      };

      setSurveyData(transformedData);
      
      // Set loading to false - greeting will be added by useEffect
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('❌ Survey error:', error);
      console.log('🔄 Falling back to mock data...');
      
      // Fallback to mock data if API fails
      const mockSurveyData: SurveyData = {
        surveyId: `survey_${Date.now()}`,
        questions: [
          {
            text: "What's your primary video streaming service?",
            options: ["Netflix", "YouTube", "Amazon Prime", "Spotify"]
          },
          {
            text: "How do you most often pay for things?",
            options: ["Credit Card", "Debit Card", "Mobile Payment", "Cash"]
          },
          {
            text: "Which of these is the cutest?",
            options: ["Baby pandas", "Baby elephants", "The Octocat", "Puppies"]
          }
        ],
        character: {
          name: "Louis",
          greeting: "Hey there! 👋 I'm Louis, your AI survey assistant! I'm here to ask you a few basic questions and I'd really love to get your honest answers. It's super quick and you'll earn some awesome coins! Are you ready to help me out?"
        },
        reward: {
          amount: 500
        }
      };

      setSurveyData(mockSurveyData);
      
      // Set loading to false - greeting will be added by useEffect
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const playAudio = async (text: string, isCompletion: boolean = false) => {
    console.log('🔊 playAudio called with:', {
      audioEnabled,
      platform: Platform.OS,
      surveyData: !!surveyData,
      serverConnected,
      isCompletion,
      text: text.substring(0, 50) + '...'
    });
    
    if (!audioEnabled) {
      console.log('🔇 Audio disabled by user');
      return;
    }
    
    if (!surveyData) {
      console.log('🔇 Audio skipped - no survey data');
      return;
    }
    
    if (!serverConnected) {
      console.log('🔇 Audio skipped - server not connected');
      return;
    }
    
    try {
      console.log('🎵 Requesting audio for:', text.substring(0, 30) + '...');
      
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }

      const apiUrl = getApiUrl();
      console.log('🌐 Using API URL:', apiUrl);

      const requestBody = {
        text: text,
        surveyId: surveyData.surveyId
      };
      console.log('📤 Request body:', requestBody);

      const response = await fetch(`${apiUrl}/api/v1/survey/speak`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log('📥 Response data:', responseData);
      
      const { audioUrl } = responseData;
      console.log('🎵 Audio URL received:', audioUrl);
      
      const audio = new Audio(audioUrl);
      
      // Set audio properties for better compatibility
      audio.preload = 'auto';
      audio.volume = 1.0;
      
      if (isCompletion) {
        setCompletionAudio(audio);
        audio.onended = () => {
          console.log('🎵 Completion audio finished, closing chat');
          setCompletionAudio(null);
          onComplete(500);
        };
      } else {
        setCurrentAudio(audio);
        audio.onended = () => {
          console.log('🎵 Audio playback ended');
          setCurrentAudio(null);
        };
      }
      
      audio.onerror = (e) => {
        console.error('❌ Audio playback error:', e);
        if (isCompletion) {
          setCompletionAudio(null);
        } else {
          setCurrentAudio(null);
        }
      };
      
      audio.onloadstart = () => {
        console.log('🎵 Audio loading started');
      };
      
      audio.oncanplay = () => {
        console.log('🎵 Audio can play');
      };
      
      audio.onload = () => {
        console.log('🎵 Audio loaded successfully');
      };
      
      // Try to play with error handling for autoplay policy
      try {
        await audio.play();
        console.log('🎵 Audio playback started');
      } catch (playError) {
        console.error('❌ Audio play failed (autoplay policy?):', playError);
        // Try to play on next user interaction
        const playOnInteraction = async () => {
          try {
            await audio.play();
            console.log('🎵 Audio playback started on user interaction');
            document.removeEventListener('click', playOnInteraction);
          } catch (e) {
            console.error('❌ Audio play failed even on interaction:', e);
          }
        };
        document.addEventListener('click', playOnInteraction);
      }
      
    } catch (error) {
      console.error('❌ Audio playback error:', error);
    }
  };

  const addMessage = (text: string, isUser: boolean, isCompletion: boolean = false) => {
    const newMessage = {
      id: `msg_${Date.now()}_${Math.random()}`,
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Play audio for Louis's messages
    if (!isUser && audioEnabled) {
      setTimeout(() => playAudio(text, isCompletion), 500);
    }
  };

  const handleOptionSelect = async (option: string) => {
    // Add user's response
    addMessage(option, true, false);
    
    setIsLoading(true);
    
    // Simulate API delay for better UX
    setTimeout(async () => {
      if (currentQuestionIndex === -1) {
        // User agreed to start survey
        if (option.toLowerCase().includes('yes') || option === "Yes, let's do it!") {
          setCurrentQuestionIndex(0);
          if (surveyData?.questions[0]) {
            addMessage(surveyData.questions[0].text, false, false);
          }
        } else {
          addMessage("No worries! Maybe next time. You can always come back for coins later! 😊", false, false);
          setTimeout(() => onClose(), 3000);
        }
      } else {
        // Submit answer to API
        try {
          const apiUrl = getApiUrl();
          console.log('📝 Submitting answer:', option, 'for question:', currentQuestionIndex);
          
          const response = await fetch(`${apiUrl}/api/v1/survey/answer`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              surveyId: surveyData?.surveyId,
              questionIndex: currentQuestionIndex,
              answer: option
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          console.log('✅ Answer response:', result);
          
          if (result.completed) {
            // Survey complete
            setSurveyCompleted(true);
            addMessage("Perfect! Thanks for answering my questions. Here are your 500 coins! 🎉", false, true);
          } else {
            // Next question
            setCurrentQuestionIndex(result.nextQuestion.index);
            addMessage(result.nextQuestion.text, false, false);
          }
        } catch (error) {
          console.error('❌ Answer submission error:', error);
          // Fallback logic
          const nextIndex = currentQuestionIndex + 1;
          
          if (nextIndex < (surveyData?.questions.length || 0)) {
            setCurrentQuestionIndex(nextIndex);
            addMessage(surveyData!.questions[nextIndex].text, false, false);
          } else {
            setSurveyCompleted(true);
            addMessage("Perfect! Thanks for answering my questions. Here are your 500 coins! 🎉", false, true);
          }
        }
      }
      setIsLoading(false);
    }, 1200);
  };

  const getCurrentOptions = () => {
    if (surveyCompleted) {
      return [];
    }
    
    if (currentQuestionIndex === -1) {
      return ["Yes, let's do it!", "Maybe later"];
    }
    
    return surveyData?.questions[currentQuestionIndex]?.options || [];
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (currentAudio && !audioEnabled) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
  };

  const renderLouisCharacter = () => {
    if (!louisPosition) return null;

    const translateX = louisTravelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [louisPosition.x, 120],
    });

    const translateY = louisTravelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [louisPosition.y, 20],
    });

    return (
      <Animated.View
        style={[
          styles.louisCharacter,
          {
            transform: [
              { translateX },
              { translateY },
            ],
          },
        ]}
      >
        <View style={styles.pixelHacker}>
          {/* Hat */}
          <View style={styles.pixelRow}>
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
          </View>
          
          {/* Head Row 1 */}
          <View style={styles.pixelRow}>
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
            <View style={[styles.pixel, { backgroundColor: '#FFDBAC' }]} />
            <View style={[styles.pixel, { backgroundColor: '#FFDBAC' }]} />
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
          </View>
          
          {/* Head Row 2 - Eyes */}
          <View style={styles.pixelRow}>
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
            <View style={[styles.pixel, { backgroundColor: '#000000' }]} />
            <View style={[styles.pixel, { backgroundColor: '#000000' }]} />
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
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
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
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
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
            <View style={[styles.pixel, { backgroundColor: 'transparent' }]} />
            <View style={[styles.pixel, { backgroundColor: 'transparent' }]} />
            <View style={[styles.pixel, { backgroundColor: '#00ff00' }]} />
          </View>
          
          {/* Feet */}
          <View style={styles.pixelRow}>
            <View style={[styles.pixel, { backgroundColor: '#8B4513' }]} />
            <View style={[styles.pixel, { backgroundColor: 'transparent' }]} />
            <View style={[styles.pixel, { backgroundColor: 'transparent' }]} />
            <View style={[styles.pixel, { backgroundColor: '#8B4513' }]} />
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        {chatVisible && (
          <Animated.View 
            style={[
              styles.chatContainer,
              {
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            {/* Background texture overlay */}
            <View style={styles.textureOverlay} />
            
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View>
                  <Text style={styles.headerTitle}>Chat with Louis</Text>
                  <Text style={styles.headerSubtitle}>
                    Survey Assistant {serverConnected ? '🟢 Connected' : '🔴 Offline'}
                  </Text>
                </View>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity 
                  style={[styles.audioToggle, audioEnabled && styles.audioToggleActive]} 
                  onPress={toggleAudio}
                >
                  {audioEnabled ? (
                    <Volume2 size={18} color={audioEnabled ? "#FF385C" : "#999"} />
                  ) : (
                    <VolumeX size={18} color="#999" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <X size={20} color="#717171" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Chat Messages */}
            <ScrollView 
              ref={scrollViewRef}
              style={styles.messagesContainer} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.messagesContent}
            >
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageRow,
                    message.isUser ? styles.userMessageRow : styles.louisMessageRow
                  ]}
                >
                  {!message.isUser && (
                    <View style={styles.louisAvatar}>
                      <Text style={styles.avatarText}>L</Text>
                    </View>
                  )}
                  <View
                    style={[
                      styles.messageBubble,
                      message.isUser ? styles.userBubble : styles.louisBubble
                    ]}
                  >
                    <Text style={[
                      styles.messageText,
                      message.isUser ? styles.userMessageText : styles.louisMessageText
                    ]}>
                      {message.text}
                    </Text>
                  </View>
                  {message.isUser && (
                    <View style={styles.userAvatar}>
                      <Text style={styles.userAvatarText}>You</Text>
                    </View>
                  )}
                </View>
              ))}
              
              {isLoading && (
                <View style={styles.messageRow}>
                  <View style={styles.louisAvatar}>
                    <Text style={styles.avatarText}>L</Text>
                  </View>
                  <View style={styles.typingIndicator}>
                    <View style={styles.typingDots}>
                      <View style={styles.typingDot} />
                      <View style={styles.typingDot} />
                      <View style={styles.typingDot} />
                    </View>
                    <Text style={styles.typingText}>Louis is typing...</Text>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Options */}
            {!isLoading && messages.length > 0 && getCurrentOptions().length > 0 && (
              <View style={styles.optionsContainer}>
                <Text style={styles.optionsTitle}>Choose your answer:</Text>
                {getCurrentOptions().map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleOptionSelect(option)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Animated.View>
        )}
      </Animated.View>
      
      {/* Louis Character Animation */}
      {renderLouisCharacter()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: screenHeight * 0.88,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#717171',
    fontWeight: '400',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  audioToggleActive: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FF385C',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  messagesContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  louisMessageRow: {
    justifyContent: 'flex-start',
  },
  louisAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00ff00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF385C',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  userAvatarText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  louisBubble: {
    backgroundColor: '#F8F8F8',
    borderBottomLeftRadius: 6,
  },
  userBubble: {
    backgroundColor: '#FF385C',
    borderBottomRightRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
  louisMessageText: {
    color: '#222222',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  typingIndicator: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDots: {
    flexDirection: 'row',
    marginRight: 8,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF385C',
    marginRight: 3,
  },
  typingText: {
    color: '#717171',
    fontSize: 14,
    fontStyle: 'italic',
  },
  optionsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#FF385C',
    textAlign: 'center',
    fontWeight: '500',
  },
  louisCharacter: {
    position: 'absolute',
    top: 120,
    left: 0,
    zIndex: 1000,
  },
  pixelHacker: {
    alignItems: 'center',
  },
  pixelRow: {
    flexDirection: 'row',
  },
  pixel: {
    width: 8,
    height: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  textureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(248, 248, 248, 0.5)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
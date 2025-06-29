// Express.js Backend for Insight AI Survey API with ElevenLabs
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const app = express();

// Enhanced CORS configuration for all possible Expo URLs
app.use(cors({
  origin: [
    'http://localhost:8081',
    'http://localhost:19006', 
    'http://127.0.0.1:8081',
    'http://127.0.0.1:19006',
    'http://localhost:19000',
    'http://127.0.0.1:19000',
    'exp://localhost:8081',
    'exp://127.0.0.1:8081'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'xi-api-key', 'Accept'],
  credentials: true
}));

app.use(express.json());

// Configuration
const ELEVENLABS_API_KEY = 'sk_42dbec14d50ff9d1547b8394417430c834ad4910993c8c95';
const VOICE_ID = 'OJbDN9JQd5Ms5TY8AP60';
const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';

// Survey questions configuration
const SURVEY_QUESTIONS = [
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
];

// Store active survey sessions (use Redis in production)
const activeSurveys = new Map();

// Ensure audio directory exists
const audioDir = path.join(__dirname, 'audio');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Serve static audio files with proper headers
app.use('/audio', express.static(audioDir, {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Content-Type', 'audio/mpeg');
    }
}));

// Add preflight handling
app.options('*', cors());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        activeSurveys: activeSurveys.size,
        elevenlabsConfigured: !!ELEVENLABS_API_KEY
    });
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// 1. Request Survey Endpoint
app.post('/api/v1/survey/request', async (req, res) => {
    try {
        console.log('📋 Survey request received:', req.body);
        
        const { userId, gameId, rewardType = 'coins', rewardAmount = 500 } = req.body;
        
        if (!userId || !gameId) {
            console.log('❌ Missing required fields');
            return res.status(400).json({ 
                error: 'userId and gameId are required' 
            });
        }

        const surveyId = `survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Store survey session
        activeSurveys.set(surveyId, {
            userId,
            gameId,
            rewardType,
            rewardAmount,
            startTime: new Date(),
            responses: {},
            currentQuestion: 0
        });

        console.log('✅ Survey created:', surveyId);

        const response = {
            surveyId,
            questions: SURVEY_QUESTIONS,
            character: {
                name: "Louis",
                voice_id: VOICE_ID,
                greeting: "Hey there! 👋 I'm Louis, your AI survey assistant! I'm here to ask you a few basic questions and I'd really love to get your honest answers. It's super quick and you'll earn some awesome coins! Are you ready to help me out?"
            },
            reward: {
                type: rewardType,
                amount: rewardAmount
            }
        };

        res.json(response);

    } catch (error) {
        console.error('❌ Error creating survey:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// 2. Generate Speech Endpoint - Updated for correct ElevenLabs format
app.post('/api/v1/survey/speak', async (req, res) => {
    try {
        const { text, surveyId } = req.body;
        
        console.log('🎵 Speech request for text:', text.substring(0, 50) + '...');
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        // Generate unique filename for this audio
        const audioId = `speech_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const audioFilename = `${audioId}.mp3`;
        const audioPath = path.join(audioDir, audioFilename);

        // Call ElevenLabs API with the exact format you provided
        const elevenlabsUrl = `${ELEVENLABS_BASE_URL}/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`;
        
        console.log('🔊 Calling ElevenLabs API...');
        
        const response = await fetch(elevenlabsUrl, {
            method: 'POST',
            headers: {
                'xi-api-key': ELEVENLABS_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    style: 0.0,
                    use_speaker_boost: true
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ ElevenLabs API error:', response.status, errorText);
            return res.status(500).json({ 
                error: 'Failed to generate speech',
                details: errorText,
                status: response.status
            });
        }

        // Save audio file
        const buffer = await response.buffer();
        fs.writeFileSync(audioPath, buffer);

        console.log('✅ Audio file saved:', audioFilename, `(${buffer.length} bytes)`);

        // Return audio URL with proper protocol
        const protocol = req.get('x-forwarded-proto') || req.protocol;
        const host = req.get('host');
        const audioUrl = `${protocol}://${host}/audio/${audioFilename}`;
        
        console.log('🎵 Audio URL:', audioUrl);
        
        res.json({
            audioUrl,
            audioId,
            text: text,
            duration: estimateAudioDuration(text)
        });

    } catch (error) {
        console.error('❌ Error generating speech:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// 3. Submit Answer Endpoint
app.post('/api/v1/survey/answer', async (req, res) => {
    try {
        console.log('📝 Answer submission received:', req.body);
        
        const { surveyId, questionIndex, answer } = req.body;
        
        if (!surveyId || questionIndex === undefined || !answer) {
            console.log('❌ Missing required fields for answer submission');
            return res.status(400).json({ 
                error: 'surveyId, questionIndex, and answer are required' 
            });
        }

        const survey = activeSurveys.get(surveyId);
        if (!survey) {
            console.log('❌ Survey not found:', surveyId);
            console.log('Active surveys:', Array.from(activeSurveys.keys()));
            return res.status(404).json({ error: 'Survey not found' });
        }

        // Store the answer
        survey.responses[`question_${questionIndex}`] = answer;
        survey.currentQuestion = questionIndex + 1;

        console.log('✅ Answer stored:', answer, 'Next question index:', survey.currentQuestion);

        const isComplete = survey.currentQuestion >= SURVEY_QUESTIONS.length;
        
        if (isComplete) {
            // Survey completed
            console.log('🎉 Survey completed!');
            res.json({
                completed: true,
                message: "Perfect! Thanks for answering my questions. Here are your 500 coins! 🎉",
                reward: {
                    type: survey.rewardType,
                    amount: survey.rewardAmount
                }
            });
        } else {
            // Next question
            const nextQuestion = SURVEY_QUESTIONS[survey.currentQuestion];
            console.log('➡️ Next question:', nextQuestion.text);
            res.json({
                completed: false,
                nextQuestion: {
                    index: survey.currentQuestion,
                    text: nextQuestion.text,
                    options: nextQuestion.options
                }
            });
        }

    } catch (error) {
        console.error('❌ Error submitting answer:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Utility Functions
function estimateAudioDuration(text) {
    // Rough estimate: ~150 words per minute, average 5 characters per word
    const wordsPerMinute = 150;
    const avgCharsPerWord = 5;
    const words = text.length / avgCharsPerWord;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes * 60); // Return seconds
}

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('💥 Server error:', error);
    res.status(500).json({ 
        error: 'Internal server error', 
        details: error.message 
    });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 Insight AI Survey API running!');
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log(`🎵 ElevenLabs Voice ID: ${VOICE_ID}`);
    console.log(`📁 Audio files: ${audioDir}`);
    console.log('✅ Ready to serve surveys!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

module.exports = app;
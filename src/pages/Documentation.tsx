import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Book, 
  Zap, 
  Settings, 
  Shield,
  Copy,
  Check
} from 'lucide-react'

const Documentation = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const sections = [
    {
      id: 'quick-start',
      title: 'Quick Start',
      icon: <Zap className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Get up and running with SurveyQuest in less than 5 minutes. Follow these simple steps to integrate surveys into your game.
          </p>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">1. Install the SDK</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`npm install surveyquest-sdk`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard('npm install surveyquest-sdk', 'install')}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
              >
                {copiedCode === 'install' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <h4 className="text-lg font-semibold text-gray-900">2. Initialize the SDK</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`import { SurveyQuest } from 'surveyquest-sdk';

const sq = new SurveyQuest({
  apiKey: 'your-api-key',
  gameId: 'your-game-id',
  environment: 'production' // or 'sandbox'
});`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(`import { SurveyQuest } from 'surveyquest-sdk';

const sq = new SurveyQuest({
  apiKey: 'your-api-key',
  gameId: 'your-game-id',
  environment: 'production'
});`, 'init')}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
              >
                {copiedCode === 'init' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <h4 className="text-lg font-semibold text-gray-900">3. Show a Survey</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`// Show survey with rewards
sq.showSurvey({
  surveyId: 'player-feedback',
  playerId: 'user123',
  rewards: {
    coins: 100,
    xp: 50,
    items: ['rare_sword', 'health_potion']
  },
  onComplete: (response) => {
    console.log('Survey completed:', response);
    // Handle survey completion
  },
  onReward: (rewards) => {
    console.log('Rewards earned:', rewards);
    // Grant rewards to player
  }
});`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(`sq.showSurvey({
  surveyId: 'player-feedback',
  playerId: 'user123',
  rewards: {
    coins: 100,
    xp: 50,
    items: ['rare_sword', 'health_potion']
  },
  onComplete: (response) => {
    console.log('Survey completed:', response);
  },
  onReward: (rewards) => {
    console.log('Rewards earned:', rewards);
  }
});`, 'show')}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
              >
                {copiedCode === 'show' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'unity-integration',
      title: 'Unity Integration',
      icon: <Code className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Integrate SurveyQuest into your Unity game with our native C# SDK.
          </p>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Installation</h4>
            <p className="text-gray-600">
              Download the Unity package from our dashboard or install via Unity Package Manager.
            </p>

            <h4 className="text-lg font-semibold text-gray-900">Basic Usage</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`using SurveyQuest;

public class GameManager : MonoBehaviour 
{
    void Start() 
    {
        SurveyQuestSDK.Initialize("your-api-key", "your-game-id");
    }
    
    public void ShowPlayerFeedbackSurvey() 
    {
        var rewards = new SurveyRewards {
            Coins = 100,
            XP = 50,
            Items = new string[] { "rare_sword" }
        };
        
        SurveyQuestSDK.ShowSurvey(
            "player-feedback",
            PlayerPrefs.GetString("playerId"),
            rewards,
            OnSurveyComplete,
            OnRewardEarned
        );
    }
    
    void OnSurveyComplete(SurveyResponse response) 
    {
        Debug.Log("Survey completed: " + response.SurveyId);
    }
    
    void OnRewardEarned(SurveyRewards rewards) 
    {
        // Grant rewards to player
        PlayerData.AddCoins(rewards.Coins);
        PlayerData.AddXP(rewards.XP);
    }
}`}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(`using SurveyQuest;

public class GameManager : MonoBehaviour 
{
    void Start() 
    {
        SurveyQuestSDK.Initialize("your-api-key", "your-game-id");
    }
    
    public void ShowPlayerFeedbackSurvey() 
    {
        var rewards = new SurveyRewards {
            Coins = 100,
            XP = 50,
            Items = new string[] { "rare_sword" }
        };
        
        SurveyQuestSDK.ShowSurvey(
            "player-feedback",
            PlayerPrefs.GetString("playerId"),
            rewards,
            OnSurveyComplete,
            OnRewardEarned
        );
    }
    
    void OnSurveyComplete(SurveyResponse response) 
    {
        Debug.Log("Survey completed: " + response.SurveyId);
    }
    
    void OnRewardEarned(SurveyRewards rewards) 
    {
        PlayerData.AddCoins(rewards.Coins);
        PlayerData.AddXP(rewards.XP);
    }
}`, 'unity')}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
              >
                {copiedCode === 'unity' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: <Book className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Complete API reference for the SurveyQuest REST API.
          </p>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Authentication</h4>
              <p className="text-gray-600 mb-4">
                All API requests require authentication using your API key in the Authorization header.
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`curl -H "Authorization: Bearer your-api-key" \\
     -H "Content-Type: application/json" \\
     https://api.surveyquest.com/v1/surveys`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Create Survey</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <code className="text-green-800 font-mono">POST /v1/surveys</code>
              </div>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`{
  "title": "Player Experience Survey",
  "description": "Help us improve your gaming experience",
  "questions": [
    {
      "type": "rating",
      "question": "How would you rate the game difficulty?",
      "scale": 5,
      "required": true
    },
    {
      "type": "multiple_choice",
      "question": "What's your favorite game mode?",
      "options": ["Campaign", "Multiplayer", "Survival"],
      "required": true
    }
  ],
  "rewards": {
    "coins": 100,
    "xp": 50,
    "items": ["rare_sword"]
  },
  "targeting": {
    "player_level": { "min": 10, "max": 50 },
    "play_time": { "min": 3600 }
  }
}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Get Survey Results</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <code className="text-blue-800 font-mono">GET /v1/surveys/{id}/results</code>
              </div>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`{
  "survey_id": "survey_123",
  "total_responses": 1247,
  "completion_rate": 0.78,
  "results": [
    {
      "question_id": "q1",
      "question": "How would you rate the game difficulty?",
      "type": "rating",
      "average_rating": 3.8,
      "responses": [
        { "rating": 5, "count": 312 },
        { "rating": 4, "count": 445 },
        { "rating": 3, "count": 289 }
      ]
    }
  ]
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'configuration',
      title: 'Configuration',
      icon: <Settings className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            Configure SurveyQuest to match your game's needs and player experience.
          </p>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">SDK Configuration</h4>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`const config = {
  apiKey: 'your-api-key',
  gameId: 'your-game-id',
  environment: 'production', // 'sandbox' or 'production'
  
  // UI Customization
  theme: {
    primaryColor: '#0ea5e9',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderRadius: '8px'
  },
  
  // Behavior Settings
  autoShow: false, // Don't show surveys automatically
  maxSurveysPerDay: 2, // Limit survey frequency
  cooldownPeriod: 3600, // 1 hour between surveys
  
  // Targeting
  defaultTargeting: {
    minPlayTime: 300, // 5 minutes minimum play time
    excludeNewPlayers: true
  },
  
  // Callbacks
  onSurveyAvailable: (survey) => {
    console.log('Survey available:', survey.title);
  },
  onError: (error) => {
    console.error('SurveyQuest error:', error);
  }
};

const sq = new SurveyQuest(config);`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Reward Configuration</h4>
              <p className="text-gray-600 mb-4">
                Configure different types of rewards for survey completion.
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`// Currency rewards
const currencyRewards = {
  coins: 100,
  gems: 10,
  tokens: 5
};

// Experience rewards
const xpRewards = {
  xp: 50,
  skillPoints: 2
};

// Item rewards
const itemRewards = {
  items: [
    { id: 'rare_sword', quantity: 1 },
    { id: 'health_potion', quantity: 3 }
  ]
};

// Conditional rewards based on responses
const conditionalRewards = {
  conditions: [
    {
      question: 'satisfaction_rating',
      operator: 'gte',
      value: 4,
      rewards: { coins: 150, xp: 75 } // Bonus for high ratings
    }
  ],
  default: { coins: 100, xp: 50 }
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            SurveyQuest is built with security and privacy as top priorities. Learn about our security measures and best practices.
          </p>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Data Protection</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• All data is encrypted in transit and at rest using AES-256</li>
                <li>• GDPR compliant with built-in consent management</li>
                <li>• Data retention policies configurable per region</li>
                <li>• Regular security audits and penetration testing</li>
                <li>• SOC 2 Type II certified infrastructure</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">API Security</h4>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`// Rate limiting
const rateLimits = {
  requests_per_minute: 1000,
  surveys_per_player_per_day: 5,
  concurrent_surveys: 1
};

// Request signing (optional)
const signature = crypto
  .createHmac('sha256', secretKey)
  .update(requestBody)
  .digest('hex');

const headers = {
  'Authorization': 'Bearer ' + apiKey,
  'X-Signature': signature,
  'X-Timestamp': Date.now()
};`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Privacy Controls</h4>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`// Configure privacy settings
sq.setPrivacySettings({
  collectIP: false, // Don't collect IP addresses
  anonymizeResponses: true, // Remove PII from responses
  dataRetention: 365, // Days to retain data
  
  // GDPR compliance
  requireConsent: true,
  consentText: "We'd like to collect feedback to improve your experience",
  
  // Player data controls
  allowDataExport: true,
  allowDataDeletion: true
});

// Handle data requests
sq.on('dataRequest', (playerId, requestType) => {
  if (requestType === 'export') {
    // Export player's survey data
  } else if (requestType === 'delete') {
    // Delete player's survey data
  }
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const [activeSection, setActiveSection] = useState('quick-start')

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentation</h1>
          <p className="text-gray-600">
            Everything you need to integrate SurveyQuest into your game
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-50 text-primary-700 border-primary-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
            >
              {sections.find(s => s.id === activeSection)?.content}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documentation
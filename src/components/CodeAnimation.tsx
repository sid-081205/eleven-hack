import React from 'react'
import { motion } from 'framer-motion'

const CodeAnimation = () => {
  const codeSnippets = [
    {
      language: 'JavaScript',
      code: `// Initialize SurveyQuest SDK
import { SurveyQuest } from 'surveyquest-sdk';

const sq = new SurveyQuest({
  apiKey: 'your-api-key',
  gameId: 'your-game-id'
});

// Show survey with rewards
sq.showSurvey({
  surveyId: 'player-feedback',
  rewards: {
    coins: 100,
    xp: 50,
    items: ['rare_sword']
  }
});`
    },
    {
      language: 'Unity C#',
      code: `// Unity Integration
using SurveyQuest;

public class GameManager : MonoBehaviour 
{
    void Start() 
    {
        SurveyQuestSDK.Initialize("your-api-key");
    }
    
    public void ShowSurvey() 
    {
        SurveyQuestSDK.ShowSurvey(
            "player-feedback",
            new Rewards {
                Coins = 100,
                XP = 50
            }
        );
    }
}`
    }
  ]

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="code-bg rounded-2xl p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-sm ml-4">SurveyQuest Integration</span>
        </div>

        <div className="space-y-6">
          {codeSnippets.map((snippet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              className="space-y-2"
            >
              <div className="text-accent-400 text-sm font-medium">{snippet.language}</div>
              <pre className="code-text text-gray-300 overflow-x-auto">
                <code>{snippet.code}</code>
              </pre>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full"
        ></motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-4 -right-4 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center"
      >
        <span className="text-primary-600 font-bold text-sm">API</span>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center"
      >
        <span className="text-accent-600 font-bold text-xs">SDK</span>
      </motion.div>
    </div>
  )
}

export default CodeAnimation
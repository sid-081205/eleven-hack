import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Coins, Sparkles, Wand2, Crown, Star } from 'lucide-react'
import MagicalBackground from './MagicalBackground'
import FloatingElements from './FloatingElements'

const HomePage = () => {
  const [coins, setCoins] = useState(1247)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const handlePlayGame = () => {
    // Navigate to game page (placeholder for now)
    console.log('Navigate to game page')
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <MagicalBackground />
      <FloatingElements />
      
      {/* Header with Coins */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 z-20 pt-12 px-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-medium text-lg">Level 12</span>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 rounded-full coin-shimmer"
          >
            <Coins className="w-5 h-5 text-yellow-900" />
            <span className="text-yellow-900 font-bold text-lg">
              {coins.toLocaleString()}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center h-full px-6 relative z-10"
      >
        {/* Game Title */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.h1
            className="magical-text text-6xl md:text-7xl font-bold mb-4 tracking-wider"
            animate={{ 
              textShadow: [
                "0 0 30px rgba(255, 215, 0, 0.3)",
                "0 0 50px rgba(255, 215, 0, 0.6)",
                "0 0 30px rgba(255, 215, 0, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            WIZARDS
          </motion.h1>
          <motion.div
            className="flex items-center justify-center space-x-4 mb-2"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-purple-400 sparkle-animation" />
            <span className="text-purple-300 text-2xl font-light tracking-[0.3em]">
              &
            </span>
            <Sparkles className="w-8 h-8 text-purple-400 sparkle-animation" />
          </motion.div>
          <motion.h2
            className="magical-text text-6xl md:text-7xl font-bold tracking-wider"
            animate={{ 
              textShadow: [
                "0 0 30px rgba(255, 215, 0, 0.3)",
                "0 0 50px rgba(255, 215, 0, 0.6)",
                "0 0 30px rgba(255, 215, 0, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            WITCHES
          </motion.h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-purple-200 text-xl md:text-2xl text-center mb-16 max-w-md leading-relaxed"
        >
          Enter a world of magic and mystery where spells come alive
        </motion.p>

        {/* Play Button */}
        <motion.button
          variants={itemVariants}
          onClick={handlePlayGame}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 40px rgba(138, 43, 226, 0.8)"
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-2xl mystical-glow transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Wand2 className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-white text-xl font-semibold tracking-wide">
              CAST SPELLS
            </span>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Star className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </div>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </motion.button>

        {/* Additional UI Elements */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-purple-300 text-sm text-center"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Ready to play</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HomePage
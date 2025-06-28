import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Coins, Play, Sparkles } from 'lucide-react'
import ModernBackground from './ModernBackground'

const HomePage = () => {
  const [coins, setCoins] = useState(1247)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handlePlayGame = () => {
    console.log('Navigate to game page')
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ModernBackground />
      
      {/* Status Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 z-20 pt-12 px-6"
      >
        <div className="flex justify-between items-center">
          {/* Level Indicator */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-card px-4 py-2 rounded-2xl"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full pulse-subtle"></div>
              <span className="text-white/90 font-medium text-sm">Level 12</span>
            </div>
          </motion.div>
          
          {/* Coins */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="coin-glow px-5 py-2.5 rounded-2xl flex items-center space-x-2"
          >
            <Coins className="w-5 h-5 text-amber-900" />
            <span className="text-amber-900 font-bold text-lg">
              {coins.toLocaleString()}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full px-6 relative z-10">
        
        {/* Game Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="modern-text text-7xl md:text-8xl text-white mb-4 tracking-tight"
            animate={{ 
              textShadow: [
                "0 0 30px rgba(255, 255, 255, 0.1)",
                "0 0 50px rgba(255, 255, 255, 0.2)",
                "0 0 30px rgba(255, 255, 255, 0.1)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            WIZARDS
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-full"></div>
          </motion.div>
          
          <motion.h2
            className="modern-text text-7xl md:text-8xl text-white tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            WITCHES
          </motion.h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-white/70 text-lg md:text-xl text-center mb-16 max-w-sm font-light leading-relaxed"
        >
          Master the arcane arts in this mystical adventure
        </motion.p>

        {/* Play Button */}
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          onClick={handlePlayGame}
          className="play-button group relative px-12 py-5 rounded-2xl overflow-hidden"
        >
          <div className="flex items-center space-x-3 relative z-10">
            <Play className="w-6 h-6 text-white fill-white" />
            <span className="text-white text-xl font-semibold tracking-wide">
              Play Game
            </span>
          </div>
          
          {/* Button shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex items-center space-x-3 glass-card px-4 py-3 rounded-full">
            <div className="status-indicator w-2 h-2 rounded-full"></div>
            <span className="text-white/80 text-sm font-medium">Ready to play</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${30 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8
            }}
          >
            <Sparkles className="w-4 h-4 text-white/40" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
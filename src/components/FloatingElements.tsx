import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star, Zap } from 'lucide-react'

const FloatingElements = () => {
  const elements = [
    { icon: Sparkles, color: 'text-purple-400', size: 'w-6 h-6' },
    { icon: Star, color: 'text-yellow-400', size: 'w-5 h-5' },
    { icon: Zap, color: 'text-blue-400', size: 'w-4 h-4' },
    { icon: Sparkles, color: 'text-pink-400', size: 'w-7 h-7' },
    { icon: Star, color: 'text-purple-300', size: 'w-4 h-4' },
    { icon: Zap, color: 'text-indigo-400', size: 'w-5 h-5' }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => {
        const Icon = element.icon
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} ${element.size} opacity-60`}
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + (index * 10)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        )
      })}

      {/* Additional floating magical symbols */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-purple-300 opacity-40 text-2xl"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 360],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        >
          {['✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮'][i]}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingElements
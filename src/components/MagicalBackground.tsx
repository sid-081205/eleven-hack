import React from 'react'
import { motion } from 'framer-motion'

const MagicalBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black"
        animate={{
          background: [
            "linear-gradient(135deg, #581c87 0%, #312e81 50%, #000000 100%)",
            "linear-gradient(135deg, #6b21a8 0%, #3730a3 50%, #111827 100%)",
            "linear-gradient(135deg, #581c87 0%, #312e81 50%, #000000 100%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Mystical orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-24 bg-indigo-500 rounded-full opacity-30 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-20 h-20 bg-pink-500 rounded-full opacity-25 blur-xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, 30, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 4 }}
      />

      {/* Magical particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.5, 1],
            y: [0, -100, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}

      {/* Constellation effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default MagicalBackground
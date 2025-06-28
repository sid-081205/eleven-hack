import React from 'react'
import { motion } from 'framer-motion'

const ModernBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating orbs */}
      <motion.div
        className="floating-orb absolute w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
        style={{ top: '10%', left: '10%' }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="floating-orb absolute w-48 h-48 bg-gradient-to-r from-purple-500/15 to-pink-500/15"
        style={{ top: '60%', right: '15%' }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />

      <motion.div
        className="floating-orb absolute w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-blue-500/20"
        style={{ top: '30%', right: '30%' }}
        animate={{
          x: [0, 50, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, delay: 4 }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Ambient particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
            y: [0, -100, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4
          }}
        />
      ))}

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
    </div>
  )
}

export default ModernBackground
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star } from 'lucide-react'
import CodeAnimation from './CodeAnimation'

const Hero = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-primary-600 font-medium">
                <Star className="h-4 w-4 fill-current" />
                <span>Trusted by 500+ game developers</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Turn Player
                <span className="gradient-text block">Engagement</span>
                Into Business Intelligence
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Seamlessly integrate surveys into games and reward players with in-game prizes. 
                Get valuable insights while keeping players engaged and happy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <span>Start Building</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:border-primary-600 hover:text-primary-600 transition-colors"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </motion.button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>5-minute setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <CodeAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
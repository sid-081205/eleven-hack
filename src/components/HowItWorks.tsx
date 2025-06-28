import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Users, Gift, BarChart3 } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Integrate SDK",
      description: "Add our lightweight SDK to your game with just a few lines of code. Works with Unity, Unreal, web, and mobile.",
      color: "bg-blue-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Create Surveys",
      description: "Design engaging surveys using our intuitive dashboard. Target specific player segments and set completion triggers.",
      color: "bg-green-500"
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Set Rewards",
      description: "Configure in-game rewards for survey completion. Coins, XP, items, or custom rewards - you decide what motivates your players.",
      color: "bg-purple-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analyze Results",
      description: "Get real-time insights with our analytics dashboard. Export data, create reports, and make data-driven decisions.",
      color: "bg-orange-500"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes and start collecting valuable player insights 
            while keeping your community engaged with meaningful rewards.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-orange-500 transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className={`${step.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {step.icon}
                  </div>
                  
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
            Start Your Free Trial
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Gift, 
  Code, 
  Users,
  Gamepad2,
  TrendingUp
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast Integration",
      description: "Get up and running in minutes with our simple SDK. One line of code to start collecting insights.",
      color: "text-yellow-500"
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Smart Reward System",
      description: "Automatically distribute in-game rewards based on survey completion. Keep players engaged and motivated.",
      color: "text-green-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-time Analytics",
      description: "Get instant insights with beautiful dashboards. Track completion rates, player sentiment, and more.",
      color: "text-blue-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "GDPR compliant with end-to-end encryption. Your players' data is always secure and protected.",
      color: "text-purple-500"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Developer Friendly",
      description: "RESTful APIs, webhooks, and SDKs for all major game engines. Built by developers, for developers.",
      color: "text-indigo-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Player Segmentation",
      description: "Target specific player groups with tailored surveys. Maximize response rates and data quality.",
      color: "text-pink-500"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Multi-Platform Support",
      description: "Works seamlessly across mobile, web, console, and PC games. One API for all platforms.",
      color: "text-red-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Advanced Targeting",
      description: "Use player behavior, demographics, and game progress to show the right surveys at the right time.",
      color: "text-teal-500"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From seamless integration to advanced analytics, we provide all the tools 
            you need to turn player feedback into actionable insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 hover-lift"
            >
              <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
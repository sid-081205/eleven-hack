import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Code, Gamepad2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Gamepad2 className="h-8 w-8 text-primary-600" />
              <Code className="h-4 w-4 text-accent-500 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold gradient-text">SurveyQuest</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/docs" className="text-gray-700 hover:text-primary-600 transition-colors">
              Documentation
            </Link>
            <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
              Pricing
            </a>
            <Link 
              to="/dashboard" 
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link to="/docs" className="text-gray-700 hover:text-primary-600 transition-colors">
                Documentation
              </Link>
              <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
                Pricing
              </a>
              <Link 
                to="/dashboard" 
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
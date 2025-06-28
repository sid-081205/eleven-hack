import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Documentation from './pages/Documentation'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Features />
            <HowItWorks />
            <Pricing />
            <Footer />
          </>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </div>
  )
}

export default App
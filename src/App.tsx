import React, { useState } from 'react'
import { Building } from 'lucide-react'
import RegistrationForm from './components/RegistrationForm'
import MembersList from './components/MembersList'
import LandingPage from './components/LandingPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'register' | 'members'>('home')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Router>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">ሳሌም ሳኮስ</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">info@salemsaccos.com • +251 910 4169 32</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex space-x-4 xl:space-x-6">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                  currentView === 'home'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                መቅድም
              </button>

              {currentView === 'home' && (
                <>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    ስለ ሳሌም
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('services')}
                    className="px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    አገልግሎት
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('committees')}
                    className="px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    ኮሚቴዎቹ
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('shares')}
                    className="px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    የአክሲዮን መጠን
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('savings')}
                    className="px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    የቁጠባ አይነት
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    ያግኙን
                  </button>
                </>
              )}
              
              <button
                onClick={() => setCurrentView('register')}
                className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                  currentView === 'register'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                አዲስ ምዝገባ
              </button>
              
              {/* 
              <button
                onClick={() => setCurrentView('members')}
                className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                  currentView === 'members'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                የተመዘገቡ አባላት
              </button>
              */}
            </nav>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <select
                value={currentView}
                onChange={(e) => setCurrentView(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="home">መቅድም</option>
                <option value="register">አዲስ ምዝገባ</option>
                <option value="members">የተመዘገቡ አባላት</option>
              </select>
            </div>
          </div>
          
          {/* Mobile Navigation for Landing Page Sections */}
          {currentView === 'home' && (
            <div className="lg:hidden mt-4 border-t pt-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => scrollToSection('about')}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-center"
                >
                  ስለ ሳሌም
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-center"
                >
                  አገልግሎት
                </button>
                <button
                  onClick={() => scrollToSection('committees')}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-center"
                >
                  ኮሚቴዎቹ
                </button>
                <button
                  onClick={() => scrollToSection('shares')}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-center"
                >
                  የአክሲዮን መጠን
                </button>
                <button
                  onClick={() => scrollToSection('savings')}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-center"
                >
                  የቁጠባ አይነት
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-center"
                >
                  ያግኙን
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/members" element={<MembersList />} />
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer - Only show on non-home pages */}
      {currentView !== 'home' && (
        <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">ሳሌም</h3>
                <p className="text-gray-600 text-sm">
                  የወንድሞች እና እህቶች ቁጠባና ብድር ኅብረት ስራ ማኅበር
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">መቅድም</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>ስለ ድርጅታችን</li>
                  <li>የአመራር አባላት</li>
                  <li>ታሪካችን</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">አገልግሎት</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>ቁጠባ አገልግሎት</li>
                  <li>ብድር አገልግሎት</li>
                  <li>የገንዘብ ዝውውር</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">ኮሚቴዎቹ</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>ቦርድ ኮሚቴ</li>
                  <li>ክትትል ኮሚቴ</li>
                  <li>ብድር ኮሚቴ</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 sm:pt-8 mt-6 sm:mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <p className="text-gray-600 text-sm text-center sm:text-left">
                  © 2024 ሳሌም ሳኮስ. ሁሉም መብቶች የተጠበቁ ናቸው።
                </p>
                <p className="text-gray-500 text-sm">
                  Designed by NABAW
                </p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </Router>
  )
}

export default App

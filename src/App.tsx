import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Lazy load pages for code-splitting
const HomePage = lazy(() => import('./pages/home-page').then(module => ({ default: module.HomePage })))
const PrivacyPolicyPage = lazy(() => import('./pages/privacy-policy-page').then(module => ({ default: module.PrivacyPolicyPage })))

function App() {
  return (
    <Router>
      <Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-graphite-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-graphite-600">Loading...</p>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
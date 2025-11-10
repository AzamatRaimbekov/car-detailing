import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home-page'
import { PrivacyPolicyPage } from './pages/privacy-policy-page'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
  )
}

export default App
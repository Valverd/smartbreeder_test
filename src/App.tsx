import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { ContextProvider } from './context/Context'

export default function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ContextProvider>
  )
}

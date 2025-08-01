import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { ContextProvider } from './context/Context'
import Favorite from './pages/Favorites'

export default function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </ContextProvider>
  )
}

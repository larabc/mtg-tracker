import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Decks from './pages/decks';
import LifeTracker from './pages/life-tracker';
import NewMatch from './pages/new-match';
import Stats from './pages/stats';
import Nav from './components/nav';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/decks" />} />
        <Route path="/decks" element={<Decks />} />
        <Route path="/life-tracker" element={<LifeTracker />} />
        <Route path="/new-match" element={<NewMatch />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
      <Nav />
    </BrowserRouter>
  )
}

export default App

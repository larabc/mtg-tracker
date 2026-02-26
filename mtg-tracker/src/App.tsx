import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Decks from './pages/Decks';
import LifeTracker from './pages/LifeTracker';
import NewMatch from './pages/NewMatch';
import Stats from './pages/Stats';
import Nav from './components/nav';

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 overflow-y-auto pb-16">
          <Routes>
            <Route path="/" element={<Navigate to="/decks" />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/life-tracker" element={<LifeTracker />} />
            <Route path="/new-match" element={<NewMatch />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
        <Nav />
      </div>
    </BrowserRouter>
  )
}

export default App

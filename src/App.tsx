import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WifiIcon, TrashIcon, Droplets, BookOpen, Bell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SystemDocs from './components/SystemDocs';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-600 text-white p-6">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Паметно село Шебет</h1>
              <nav className="space-x-6">
                <Link to="/" className="text-white hover:text-blue-200 transition">Контролна табла</Link>
                <Link to="/docs" className="text-white hover:text-blue-200 transition">О систему</Link>
              </nav>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/docs" element={<SystemDocs />} />
          </Routes>
        </div>
      </NotificationProvider>
    </Router>
  );
}

export default App;
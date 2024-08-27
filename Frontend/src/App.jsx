import React from 'react';
import Header from './components/Header.jsx'
import MainContent from './pages/MainContent.jsx';
import Footer from './components/Footer.jsx'
import Create from './pages/Create.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function CreateAndLogout() {
  localStorage.clear()
  return <Create />
}

function App() {

    return(
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={
          <ProtectedRoute>
          <MainContent />
          </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/create" element={<CreateAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App

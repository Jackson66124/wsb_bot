import React from 'react';
import Header from './components/Header.jsx'
import LoggedInHeader from './components/LoggedInHeader.jsx'
import MainContent from './components/MainContent.jsx';
import Connected from './pages/Connected.jsx';
import Footer from './components/Footer.jsx'
import Create from './pages/Create.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Default from './pages/Default.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter, useLocation } from 'react-router-dom';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function CreateAndLogout() {
  localStorage.clear()
  return <Create />
}

const ConditionalHeader = () => {
  const location = useLocation();
  const isProtectedRoute = ['/home', '/connected'].includes(location.pathname);

  return isProtectedRoute ? <LoggedInHeader /> : <Header />;
};

function App() {
  return (
    <BrowserRouter>
      <ConditionalHeader />
      <Routes>
        <Route path="/home" element={
          <ProtectedRoute>
            <MainContent />
          </ProtectedRoute>
        } />
        <Route path="/connected" element={
          <ProtectedRoute>
            <Connected/>
          </ProtectedRoute>
        } />
        <Route path="/" element={<Default />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/create" element={<CreateAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

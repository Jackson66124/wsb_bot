import { Navigate, useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import LoggedInHeader from "./components/LoggedInHeader";
import MainContent from "./components/MainContent";
import Connected from "./pages/Connected";
import Footer from "./components/Footer";
import Create from "./pages/Create";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Default from "./pages/Default";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function CreateAndLogout() {
  localStorage.clear();
  return <Create />;
}

function ConditionalHeader() {
  const location = useLocation();
  const [headerType, setHeaderType] = useState("regular");

  useEffect(() => {
    const isProtectedRoute = ["/home", "/connected"].includes(location.pathname);
    setHeaderType(isProtectedRoute ? "loggedIn" : "regular");
  }, [location.pathname]);

  return headerType === "loggedIn" ? <LoggedInHeader /> : <Header />;
}

function App() {
  return (
    <div className="site">
      <BrowserRouter>
        <ConditionalHeader />
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <MainContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connected"
            element={
              <ProtectedRoute>
                <Connected />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Default />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/create" element={<CreateAndLogout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

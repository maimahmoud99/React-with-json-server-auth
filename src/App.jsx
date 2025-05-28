import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Posts from "./Posts";
import FloatingButton from "./FloatingButtonPage";
import Form from "./Form";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <div className="h-16" />}
      {!isAuthPage && <FloatingButton />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <Posts />
              </div>
            }
          />
          <Route
            path="/form"
            element={
              <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <Form />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Login />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Register />
              </div>
            }
          />
          <Route
            path="/posts"
            element={
              <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Posts />
              </div>
            }
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;

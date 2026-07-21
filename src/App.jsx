import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Login from "./Components Folder/StudentFolder/LoginAndLogoutPage/Login";
import Register from "./Components Folder/StudentFolder/LoginAndLogoutPage/Register";
import MotherScreen from "./Components Folder/MotherScreen/MotherScreen";

// Login.jsx / Register.jsx expect a `navigate` prop (a function you call
// with a path string) rather than importing useNavigate themselves - these
// two small wrappers supply that from react-router.
function LoginPage() {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
}

function RegisterPage() {
  const navigate = useNavigate();
  return <Register navigate={navigate} />;
}

// Gate: anything that isn't /login or /register requires a logged-in user.
// Login.jsx sets localStorage("userId") on a successful login.
function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Everything else (including "/") requires being logged in.
            MotherScreen owns its own internal routing (sidebar + content)
            for whatever pages live inside it - Companyprofile, EditProfile,
            etc. */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MotherScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
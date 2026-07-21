
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MotherScreen from "./MotherScreen/MotherScreen";

import LoginScreen from "./Components Folder/StudentFolder/LoginAndLogoutPage/Login";
import RegisterScreen from "./Components Folder/StudentFolder/LoginAndLogoutPage/Register";

export default function RouteFile() {
  return (
    <div
      className="route-file"
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* ================= LOGIN ================= */}
          <Route
            path="/Page/LoginScreen/"
            element={<LoginScreen />}
          />

          {/* ================= REGISTER ================= */}
          <Route
            path="/Page/RegisterScreen/"
            element={<RegisterScreen />}
          />

          {/* ================= MAIN APPLICATION ================= */}
          {/* MotherScreen contains the Header + Sidebar */}
          <Route
            path="/*"
            element={<MotherScreen />}
          />

          {/* ================= DEFAULT ROUTE ================= */}
          <Route
            path="/"
            element={
              <Navigate
                to="/Page/LoginScreen/"
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


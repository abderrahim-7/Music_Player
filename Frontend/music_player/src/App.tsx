import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterInfos from "./pages/RegisterInfos";
import Home from "./pages/Home";
import ProtectedRoute from "./components/layout/ProtectedRoutes";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/infos" element={<RegisterInfos />} />
      <Route path="/verify" element={<VerifyEmail />} />
    </Routes>
  );
}

export default App;

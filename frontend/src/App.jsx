import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LogoutButton from "./components/LogoutButton";
import Register from "./features/Register/Register";
import MainLayout from "./layouts/MainLayout";
import Login from "./features/Login/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {/* MainLayout chứa Navbar và Sidebar */}
              <MainLayout />
              <div>Chào mừng bạn đã đăng nhập thành công!</div>
              <LogoutButton />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomeGreeting from "./components/HomeGreeting";
import Register from "./features/Register/Register";
import Profile from "./features/Profile/Profile";
import MainLayout from "./layouts/MainLayout";
import Login from "./features/Login/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/*prettier-ignore*/}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*prettier-ignore*/}
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/" element={<HomeGreeting />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="body-content">
        <Sidebar />
        <main className="main-region">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

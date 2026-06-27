import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="min-h-screen pb-10">
      <NavBar />
      <div className="mx-3 md:mx-10 lg:mx-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

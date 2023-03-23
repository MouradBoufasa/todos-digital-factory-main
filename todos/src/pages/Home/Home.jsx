import Sidebar from "./Sidebar";
import Main from "./Main.jsx";
import "./Home.scss";
import Rightsidebar from "./RightSidebar";
import { useEffect } from "react";

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))[0];
  useEffect(() => {
  }, [user]);
  return (
    <div className="Home">
      <Sidebar />
      <Main />
      <Rightsidebar />
    </div>
  );
};

export default Home;

import Sidebar from "./Sidebar";
import Main from "./Main.jsx";
import "./Home.scss";
import Rightsidebar from "./RightSidebar";

const Home = () => {
  return (
    <div className="Home">
      <Sidebar />
      <Main />
      <Rightsidebar />
    </div>
  );
};

export default Home;

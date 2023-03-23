import { useNavigate } from 'react-router-dom';

import "./Home.scss";
import { BsSearch } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Button, Input } from "antd";

const Home = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear('user');
    navigate('/login');
    return;
  };

  return (
    <div className="Sidebar">
      <div>
        <h3>Menu</h3>
        <Input placeholder={"Search..."} prefix={<BsSearch />} />
      </div>

      <Button type="dashed" icon={<MdLogout />} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;

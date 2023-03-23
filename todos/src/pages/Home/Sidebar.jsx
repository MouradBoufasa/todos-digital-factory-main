import "./Home.scss";
import { BsSearch } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Button, Input } from "antd";

const Home = () => {
  return (
    <div className="Sidebar">
      <div>
        <h3>Menu</h3>
        <Input placeholder={"Search..."} prefix={<BsSearch />} />
      </div>

      <Button type="dashed" icon={<MdLogout />}>
        Logout
      </Button>
    </div>
  );
};

export default Home;

import "./Home.scss";
import { BsSearch } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Button, Input } from "antd";

const Home = () => {
  const { TextArea } = Input;

  return (
    <div className="Sidebar right">
      <div>
        <h3>Todo:</h3>
        <Input placeholder={"Search..."} prefix={<BsSearch />} />
        <TextArea rows={4} />

        <h3>Embeded Todos:</h3>
      </div>

      <div className="actions">
        <Button type="primary" danger block>
          Delete Todo
        </Button>
        <Button type="primary" block>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Home;

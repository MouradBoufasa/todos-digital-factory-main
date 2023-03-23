import { Button, Input, Checkbox, Divider } from "antd";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import "./Home.scss";

const Main = () => {
  const [input, setInput] = useState();

  return (
    <div className="Main">
      <h2>Todos</h2>

      <div className="input">
        <Input
          placeholder={"Add a new todo"}
          prefix={<AiOutlinePlus />}
          block
        />
        <Button type="primary">Add Todo</Button>
      </div>

      <div className="todo">
        <Checkbox>Take mourad outside</Checkbox>
        <IoIosArrowForward />
      </div>
      <Divider />
      <div className="todo">
        <Checkbox>Take mourad outside</Checkbox>
        <IoIosArrowForward />
      </div>
      <Divider />
      <div className="todo">
        <Checkbox>Take mourad outside</Checkbox>
        <IoIosArrowForward />
      </div>
      <Divider />
    </div>
  );
};

export default Main;

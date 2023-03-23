import "./Home.scss";
import { BsSearch } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Button, Input } from "antd";
import { useSelector } from "react-redux";
import { updateTodo } from '../../redux/todos';

const Home = () => {
  const { TextArea } = Input;
  const { selectedTodo } = useSelector((state) => state.todos);

  const handleUpdate = async (todo, update) => {
    const updatedTodo = {
      ...todo,
      ...update
    };

    dispatch(updateTodo(updatedTodo));
  };
  return (
    <div className="Sidebar right">
      <div>
        <h3>Todo:</h3>
        <Input placeholder={"Todo"} value={selectedTodo && selectedTodo.title} />
        <TextArea rows={4} placeholder={'Todo description'} value={selectedTodo && selectedTodo.description} />

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

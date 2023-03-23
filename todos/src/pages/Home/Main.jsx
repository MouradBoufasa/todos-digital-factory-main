import { Button, Input, Checkbox, Divider, Form } from "antd";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { axiosInstance } from "../../config/axios";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodo, updateTodo } from '../../redux/todos';

const Main = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'))[0];
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos(user));
  }, []);

  const checkTodo = async () => {

  };

  const onSubmit = async (values) => {
    const todo = {
      userId: user.id,
      title: values.todo,
      completed: false,
      endDate: null,
      pos: 0,
      description: ''
    };

    const res = await axiosInstance.post('/todos', todo);
  };

  return (
    <div className="Main">
      <h2>Todos</h2>

      <Form
        className="input"
        onFinish={onSubmit}
      >
        <Form.Item
          name="todo"
          style={{ width: '100%' }}
          rules={[{ required: true, message: 'Please enter a todo!', },]}
        >
          <Input
            placeholder={"Add a new todo"}
            prefix={<AiOutlinePlus />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" >Add Todo</Button>
      </Form>

      <div>{todos.length > 0 && todos
        .map((todo) => (
          <div key={todo.id} onClick={() => dispatch(selectTodo(todo))}>
            <div className="todo">
              <Checkbox checked={todo.completed} onClick={() => dispatch(updateTodo(todo))}>{todo.title}</Checkbox>
              <IoIosArrowForward />
            </div>
            <Divider />
          </div>
        ))
      }</div>
    </div>
  );
};

export default Main;

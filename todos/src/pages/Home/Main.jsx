import { Button, Input, Checkbox, Divider, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { axiosInstance } from "../../config/axios";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodo, updateTodo } from '../../redux/todos';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLocalStorage = localStorage.getItem('user');

  if (!userLocalStorage) {
    return <div>Loading...</div>;
  }

  const user = JSON.parse(userLocalStorage)[0];
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    if (!user) navigate('/login')
    dispatch(fetchTodos(user.id));
  }, []);

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

  const checkTodo = async (todo) => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed
    };

    dispatch(updateTodo(updatedTodo));
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
              <Checkbox checked={todo.completed} onClick={() => checkTodo(todo)}><span style={{ textDecoration: todo.completed && 'line-through' }}>{todo.title}</span></Checkbox>
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

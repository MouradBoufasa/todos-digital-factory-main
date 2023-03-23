import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Input from "../../Components/Input/Input";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Button } from "antd";
import { axiosInstance } from "../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.get(`/authentification?email=${email}`);
      if (res.data.length === 0) {
        toast.error("Wrong Email. Please try again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/home");
    } catch (Error) {
      console.log(Error);
    }
  }

  return (
    <div className="login">
      <ToastContainer />
      <div className="form">
        <form onSubmit={handleSubmit}>
          <Input
            icon={<HiOutlineUserCircle />}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

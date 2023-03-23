import "./Input.scss";
const Login = ({ type, placeholder, onChange, icon }) => {
  return (
    <div className="Input">
      <h1>{icon}</h1>
      <input type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Login;

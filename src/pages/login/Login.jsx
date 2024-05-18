import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dist/login.css";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (inputs.email === "" || inputs.password === "") {
      setErr("No fields can be empty");
      return;
    }

    try {
      const response = await login(inputs);
      navigate("/");
      if (response.status === 200) {
        navigate("/");
      } else {
        if (response.message) {
          setErr(response.message);
        } else {
          setErr("Unknown error");
        }
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>Socital.</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum, alias totam numquam ipsa exercitationem dignissimos, error nam, consequatur.</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            {err && <p>{err.message || err}</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dist/register.css";
import { AuthContext } from "../../context/authContext";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confpassword: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { register } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (inputs.username === "" || inputs.email === "" || inputs.password === "") {
      setErr("No fields can be empty");
      return;
    }

    try {
      const response = await register(inputs);
      if (response.status === 200) {
        navigate("/login");
      } else {
        setErr(response.message);
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h2>Socital.</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum, alias totam numquam ipsa exercitationem dignissimos, error nam, consequatur.</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h2>Register</h2>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <input type="password" placeholder="Confirm Password" name="confpassword" onChange={handleChange} />
            {err && <p>{err.message || err}</p>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

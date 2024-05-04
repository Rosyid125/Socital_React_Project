import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dist/register.css";
import api from "../services/api";

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

  const handleClick = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confpassword) {
      setErr("Password dengan Confirm Password tidak cocok");
      return;
    }

    if (inputs.username === "" || inputs.email === "" || inputs.password === "") {
      setErr("Jangan biarkan field kosong");
      return;
    }

    try {
      const response = await api.post("/register", inputs);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      const errorData = JSON.stringify(err.response.status);
      if (errorData === "409") {
        const errorMessage = "Email telah digunakan";
        setErr(errorMessage);
      } else if (errorData === "500") {
        const errorMessage = "Gagal menyimpan data, masalah query pada backend";
        setErr(errorMessage);
      } else if (errorData === "422") {
        const errorMessage = 'Anda melupakan "@" pada email anda';
        setErr(errorMessage);
      }
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
            {<p>{err}</p>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

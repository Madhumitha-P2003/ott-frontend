import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser(name, email, password);

      alert("Registration successful. Please sign in.");
      navigate("/"); // redirect to Login page
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay">
        <div className="register-box">
          <h1>Create Account</h1>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleRegister}>
            Sign Up
          </button>

          <p className="signin-text">
            Already have an account?
            <span onClick={() => navigate("/")}> Sign in now.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

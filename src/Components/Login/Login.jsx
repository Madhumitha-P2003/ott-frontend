import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("❌ Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await loginUser(email, password);

      if (!response?.token) {
        setMessage("❌ Login failed. Token not received.");
        return;
      }

      setMessage("✅ Logged in successfully");

      setTimeout(() => {
        navigate("/home");
      }, 1200);

    } catch (err) {
      console.error(err);
      setMessage("❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-box">
          <h1>Sign In</h1>

          {message && <p className="login-message">{message}</p>}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="signup-text">
            New to Netflix?
            <span onClick={() => navigate("/register")}>
              {" "}Sign up now.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

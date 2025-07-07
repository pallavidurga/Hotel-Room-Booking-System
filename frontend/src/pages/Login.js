import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Home from "./Home";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => navigate("/");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      setMessage("Login successful!");

      // Redirect based on role
      setTimeout(() => {
        navigate(data.role === "ADMIN" ? "/admin" : "/");
      }, 1000);
    } catch (err) {
      setIsError(true);
      setMessage(err.message || "Login failed.");
    }
  };

  return (
    <>
      <style>{`
        .login-page-wrapper { position: relative; width: 100%; height: 100vh; overflow: hidden; }
        .modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .login-modal-box { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); width: 100%; max-width: 420px; text-align: center; }
        .login-modal-box h2 { font-size: 28px; font-weight: 600; color: #2d3748; margin-bottom: 20px; }
        .login-modal-box input { width: 100%; padding: 14px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 8px; font-size: 16px; }
        .login-modal-box button { width: 100%; padding: 14px; background-color: #2f858d; color: white; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; transition: background-color 0.2s; }
        .login-modal-box button:hover { background-color: #266e73; }
        .error-message { color: red; margin-bottom: 10px; }
        .success-message { color: green; margin-bottom: 10px; }
        .register-link { margin-top: 15px; font-size: 14px; color: #4a5568; }
        .register-link span { color: #2f858d; font-weight: 600; cursor: pointer; text-decoration: underline; }
        @media (max-width: 500px) {
          .login-modal-box { padding: 20px; width: 90%; }
          .login-modal-box h2 { font-size: 22px; }
          .login-modal-box input { padding: 12px; font-size: 14px; }
          .login-modal-box button { padding: 12px; font-size: 14px; }
        }
      `}</style>

      <div className="login-page-wrapper">
        <Home />
        <div className="modal-overlay" onClick={handleClose}>
          <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              {message && (
                <p className={isError ? "error-message" : "success-message"}>{message}</p>
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <p className="register-link">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

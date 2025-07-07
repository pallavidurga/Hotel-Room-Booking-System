import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Home from "./Home";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      setIsError(true);
      return;
    }

    if (!/^\d{10}$/.test(phoneno)) {
      setMessage("Phone number must be 10 digits.");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, phoneno, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Registered successfully!");
      setIsError(false);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.message || "An unknown error occurred.");
      setIsError(true);
    }
  };

  const pageStyles = `
    .register-page-wrapper { position: relative; width: 100%; height: 100vh; overflow: hidden; }
    .modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .register-modal-box { background-color: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); width: 100%; max-width: 450px; text-align: center; z-index: 1001; }
    .register-modal-box h2 { font-size: 28px; font-weight: 600; color: #2d3748; margin-bottom: 30px; }
    .register-modal-box input { width: 100%; padding: 14px 16px; margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 16px; box-sizing: border-box; }
    .register-modal-box input::placeholder { color: #a0aec0; }
    .register-modal-box input:focus { outline: none; border-color: rgba(47, 133, 141, 0.5); box-shadow: 0 0 0 2px rgba(47, 133, 141, 0.2); }
    .register-modal-box button { width: 100%; padding: 14px; border: none; border-radius: 8px; background-color: rgba(47, 133, 141, 1); color: white; font-size: 16px; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
    .register-modal-box button:hover { background-color: rgba(38, 110, 115, 1); }
    .login-link { margin-top: 25px; font-size: 14px; color: #4a5568; }
    .login-link a { color: rgba(47, 133, 141, 1); font-weight: 600; text-decoration: none; }
    .login-link a:hover { text-decoration: underline; }
    .error-message { color: #e53e3e; font-size: 14px; margin-bottom: 15px; }
    .success-message { color: green; font-size: 14px; margin-bottom: 15px; }

    @media (max-width: 500px) {
      .register-modal-box {
        padding: 20px;
        width: 90%;
      }
      .register-modal-box h2 {
        font-size: 22px;
      }
      .register-modal-box input {
        padding: 12px;
        font-size: 14px;
      }
      .register-modal-box button {
        padding: 12px;
        font-size: 14px;
      }
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="register-page-wrapper">
        <Home />
        <div className="modal-overlay" onClick={handleClose}>
          <div className="register-modal-box" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleRegister}>
              <h2>Register</h2>
              {message && (
                <p className={isError ? "error-message" : "success-message"}>{message}</p>
              )}
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneno}
                onChange={(e) => setPhoneno(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Register</button>
              <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

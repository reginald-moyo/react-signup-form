import React, { useState } from 'react'
import './LoginSignup.css'
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const LoginSignup = () => {

  const [action, setAction] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fake stored user (for demo login)
  const fakeUser = {
    email: "test@gmail.com",
    password: "Password123"
  };

  const validatePassword = (pwd) => {
    return {
      minLength: pwd.length >= 8,
      hasUppercase: /[A-Z]/.test(pwd),
      hasNumber: /\d/.test(pwd)
    };
  };

  const passwordValidation = validatePassword(password);

  const handleSubmit = () => {

    if (action === "Login") {
      if (email !== fakeUser.email) {
        setMessage("User not found");
        return;
      }

      if (password !== fakeUser.password) {
        setMessage("Password entered incorrect");
        return;
      }

      setMessage("Login successful ✅");
    }

    if (action === "Sign Up") {
      if (!passwordValidation.minLength) {
        setMessage("Password too short (minimum 8 characters)");
        return;
      }

      if (!passwordValidation.hasUppercase) {
        setMessage("Password must contain at least one uppercase letter");
        return;
      }

      if (!passwordValidation.hasNumber) {
        setMessage("Password must contain at least one number");
        return;
      }

      setMessage("Account created successfully ✅ (demo only)");
    }
  };

  const handleForgotPassword = () => {
    setMessage("Password reset link sent (demo only)");
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">

        {action === "Login" ? null : (
          <div className="input">
            <FaUser className='icon' />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <FaEnvelope className='icon' />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <FaLock className='icon' />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Password criteria (only show in Sign Up mode) */}
        {action === "Sign Up" && (
          <div className="password-criteria">
            <p>Password must contain:</p>
            <ul>
              <li style={{ color: passwordValidation.minLength ? "green" : "red" }}>
                At least 8 characters
              </li>
              <li style={{ color: passwordValidation.hasUppercase ? "green" : "red" }}>
                One uppercase letter
              </li>
              <li style={{ color: passwordValidation.hasNumber ? "green" : "red" }}>
                One number
              </li>
            </ul>
          </div>
        )}
      </div>

      {action === "Login" && (
        <div className="forgot-password">
          Lost Password? <span onClick={handleForgotPassword}>Click here!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
            setMessage("");
          }}
        >
          Sign Up
        </div>

        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            if (action === "Login") {
              handleSubmit();
            } else {
              setAction("Login");
              setMessage("");
            }
          }}
        >
          Login
        </div>
      </div>

      <div className="form-message" >
        {message}
      </div>

      {action === "Sign Up" && (
        <div
          className="submit"
          onClick={handleSubmit}
        >
          Create Account
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
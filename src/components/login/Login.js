import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import "./Login.css";

function Login() {
  const [isNotRegistered, setIsNotRegistered] = useState(false);

  const [inputs, setInputs] = useState({
    password: "",
    email: "",
  });

  const [warning, setWarning] = useState({
    password: "",
    email: "",
  });

  const [isWrong, setIsWrong] = useState({
    password: false,
    email: false,
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  function handleClick(event) {
    setIsWrong({
      password: false,
      email: false,
    });

    event.preventDefault();
    if (inputs.password.length < 8) {
      setWarning((prev) => ({
        ...prev,
        password: "Password min 8 letters",
      }));
      setIsWrong((prev) => ({
        ...prev,
        password: true,
      }));
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputs.email)) {
      setWarning((prev) => ({
        ...prev,
        email: "Email is not valid",
      }));
      setIsWrong((prev) => ({
        ...prev,
        email: true,
      }));
    } else if (!isWrong.email && !isWrong.password) {
      window.location.assign("http://localhost:3000");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    setIsNotRegistered(true);
  };

  return (
    <div className="login">
      <main className="login-card">
        <header className="login-header">
          <p>Welcome</p>
        </header>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-form-label">
            Email
          </label>
          <p className="login-form-warning">{isWrong.email && warning.email}</p>
          <input
            type="email"
            id="email"
            className="login-form-input"
            maxLength={50}
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
          <label htmlFor="password" className="login-form-label">
            Password
          </label>
          <p className="login-form-warning">
            {isWrong.password && warning.password}
          </p>
          <input
            type="password"
            id="password"
            className="login-form-input"
            maxLength={50}
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </form>
        <footer className="login-footer">
          <p className="login-footer-register">
            Do not have account ?
            <a href="#" onClick={handleRegistration}>
              Sign up
            </a>
          </p>
          <button onClick={handleClick} className="login-form-footer-button">
            <IconContext.Provider
              value={{
                color: "mediumpurple",
                size: "50px",
              }}
            >
              <FaSignInAlt />
            </IconContext.Provider>
          </button>
        </footer>
      </main>
    </div>
  );
}

export default Login;

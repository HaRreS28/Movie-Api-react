import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import "./Login.css";
import { RxCross2 } from "react-icons/rx";
import AuthService from "../../api/authService";

function Login({ isRegister }) {
  const [inputs, setInputs] = useState({
    password: "",
    email: "",
  });

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      window.location.assign("http://localhost:3000");
    }
  }, []);

  const [warning, setWarning] = useState({
    password: "",
    email: "",
  });

  const [isWrong, setIsWrong] = useState({
    password: false,
    email: false,
  });

  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  function handleClick(event) {
    console.log("WTTF");
    setIsWrong({
      password: false,
      email: false,
    });

    setAlreadyExist(false);
    setWrongCredentials(false);
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
      if (isRegister) {
        AuthService.register(inputs.email, inputs.password)
          .then((data) => {
            window.location.assign("http://localhost:3000");
          })
          .catch((er) => {
            setAlreadyExist(true);
            console.log(er);
          });
      } else {
        console.log("WTTF inside login");
        AuthService.login(inputs.email, inputs.password)
          .then((data) => {
            window.location.assign("http://localhost:3000");
          })
          .catch((er) => {
            setWrongCredentials(true);
            console.log(er);
          });
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    window.location.assign("http://localhost:3000/register");
  };

  return (
    <div className="login">
      <main className="login-card">
        <header className="login-header">
          <div className="login-header-welcomer">
            <p className="login-header-paragraph">
              {isRegister
                ? "Sign up, and join our community!"
                : "Welcome back!"}
            </p>
            {/* <IconContext.Provider
              value={{
                color: "#CC0066",
                size: "35px",
              }}
            >
              <RxCross2
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.assign("http://localhost:3000");
                }}
              />
            </IconContext.Provider> */}
          </div>
          {/* {isRegister && (
            <p className="login-header-paragraph login-header-create-account">
              Create a new account, do not hesitate and join best community
            </p>
          )} */}
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
          <p className="login-form-warning">
            {wrongCredentials ? "Wrong credentials" : ""}
          </p>
          <p className="login-form-warning">
            {alreadyExist ? "User already exists" : ""}
          </p>
        </form>
        <footer className="login-footer">
          {!isRegister && (
            <p className="login-footer-register">
              Do not have account?
              <a href="/register" onClick={handleRegistration}>
                Sign up
              </a>
            </p>
          )}
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

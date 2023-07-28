import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  // let history=useHistory() depricated. Now we use
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // prevent page from reloding on clicking submit
    const url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save auth token and redirect user
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged in successfully","success");
      navigate("/");
    } else {
        props.showAlert(json.error,"danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container border p-3 rounded my-3 text-light" style={{width:"30%",backgroundColor:"rgb(143 127 108 / 59%)"}}>
        <h2 className="my-2 text-dark text-center">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="text-center container"><button type="submit" className="btn btn-primary btn-md">
          Submit
        </button></div>
      </form>
    </div>
  );
};

export default Login;

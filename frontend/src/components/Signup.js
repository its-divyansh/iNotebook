import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:'' });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // prevent page from reloding on clicking submit
      if(credentials.password===credentials.cpassword){
        const url = "http://localhost:5000/api/auth/createuser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // save auth token and redirect user
        localStorage.setItem("token", json.authToken);
        props.showAlert("User added successfully","success")
        navigate("/");
      } else {
        props.showAlert(json.errors.errors[0].msg,"danger");
      }
      }
      else{
        props.showAlert("Confirm password does not match with password","warning");
      }
    };
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
    <div className="container border p-3 rounded my-3 text-light" style={{width:"30%",backgroundColor:"rgb(143 127 108 / 59%)"}}>
        <h2 className="my-2 text-dark text-center">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            minLength={3}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="ema">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            aria-describedby="emailHelp"
            placeholder="Enter password"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm your password"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <div className="container text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

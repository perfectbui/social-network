import React, { useState } from "react";
import Axios from "axios";

import "./SignUp.css";
import Aux from "../../../hoc/Auxiliary";

const SignUp = (props) => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [error,setError] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    Axios.post("/api/signup", {
      userName,
      email,
      password,
      age,
      phone,
      address,
    })
      .then((response) => props.history.push("/signin"))
      .catch((error) => {
        setError(true);
        setTimeout(()=>setError(false),2000);
      })
  };

  return (
    <Aux>
      <form className="form-signup">
        {error ? <div className="signup-fail">Sign Up Failed !!!</div> : null}
        <h2>SIGN UP</h2>
        <input
          type="text"
          placeholder="UserName"
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          placeholder="Age"
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          onChange={(event) => setPhone(event.target.value)}
        />
        <button className="sign-up" onClick={(event) => onSubmitHandler(event)}>
          Sign Up
        </button>
      </form>
    </Aux>
  );
};

export default SignUp;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Axios from "axios"

import "./Introduce.css";

const Introduce = (props) => {
  const [loading,setLoading] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [userName, setUserName] = useState(props.dataUser.userName);
  const [email, setEmail] = useState(props.dataUser.email);
  const [age, setAge] = useState(props.dataUser.age);
  const [phone, setPhone] = useState(props.dataUser.phone);
  const [address, setAddress] = useState(props.dataUser.address);

  const editHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    Axios({
      method:"put",
      url:"api/profile/edit",
      data:{userName,email,phone,address,age},
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    }).then(response => window.location.reload())
    .catch(error=>console.log(error))
  }

  return (
    <div className="introduce">
      {loading ? <Spinner/> : null}
      <div className="logo-introduce">
        <i className="fab fa-react fa-5x"></i>
      </div>
      <h2 style={{ marginTop: "25px" }}>Welcome, {props.dataUser.userName}!</h2>
      <div
        style={{ textAlign: "left", color: "#00000096", marginLeft: "10px" }}
      >
        <li style={{ margin: "5px" }}>
          <i className="fas fa-birthday-cake" style={{ marginRight: "5px" }} />
          <span>Age: {props.dataUser.age}</span>
        </li>
        <li style={{ margin: "5px" }}>
          <i className="fas fa-phone" style={{ marginRight: "5px" }} />
          <span>Phone: {props.dataUser.phone}</span>
        </li>
        <li style={{ margin: "5px" }}>
          <i className="fas fa-address-card" style={{ marginRight: "5px" }} />
          <span>Address: {props.dataUser.address}</span>
        </li>
      </div>
      {props.personal ? (
        <button
          className="btn-edit-profile"
          onClick={() => setOpenEditPost(true)}
        >
          Edit the profile
        </button>
      ) : null}
      {openEditPost ? (
        <React.Fragment>
          <Backdrop show={openEditPost} click={() => setOpenEditPost(false)} />
          <form className="edit-profile-form">
            <h2>Edit your profile</h2>
            <input
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <input
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <button
              onClick={editHandler}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2b89e0",
                color: "white",
                width: "100px",
                margin: "10px auto",
                borderRadius: "5px",
                cursor:'pointer'
              }}
            >
              Edit
            </button>
          </form>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Introduce;

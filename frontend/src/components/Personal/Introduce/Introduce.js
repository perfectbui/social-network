import React from "react";

import "./Introduce.css";

const Introduce = (props) => {
  return (
    <div className="introduce">
      <div className="logo-introduce">
        <i className="fab fa-react fa-5x"></i>
      </div>
      <h2 style={{marginTop:"25px"}}>Welcome, {props.dataUser.userName}!</h2>
      <div style={{textAlign:"left",color:"#00000096",marginLeft:"10px"}}>
        <li style={{margin:"5px"}}><i className="fas fa-birthday-cake" style={{marginRight:"5px"}}/><span>Age: {props.dataUser.age}</span></li>
        <li style={{margin:"5px"}}><i className="fas fa-phone" style={{marginRight:"5px"}}/><span>Phone: {props.dataUser.phone}</span></li>
        <li style={{margin:"5px"}}><i className="fas fa-address-card" style={{marginRight:"5px"}}/><span>Address: {props.dataUser.address}</span></li>
      </div>
      <button className="btn-edit-profile">Edit the profile</button>
    </div>
  );
};

export default Introduce;

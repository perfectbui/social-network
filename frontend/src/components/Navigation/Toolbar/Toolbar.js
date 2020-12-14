import React, { useState } from "react";
import { useSelector } from "react-redux";

import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import "./Toolbar.css";

const Toolbar = (props) => {
  const [toggleLogout, setToggleLogout] = useState(false);
  const { dataUser } = useSelector((state) => state.auth);

  return (
    <header>
      <div className="toolbar">
        <Logo />
        <div className="search">
          <i className="fas fa-search" />
          <input placeholder="Search" onFocus={props.search} />
        </div>
        <NavigationItems />

        {dataUser ? (
          <div
            className="nav-item-avt"
            onClick={() => setToggleLogout((prevState) => !prevState)}
          >
            <img
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              src={dataUser.avatar}
              alt="img"
            />
            <span style={{ marginLeft: "5px", fontSize: "16px" }}>{dataUser.userName}</span>
            {toggleLogout ? (
              <p
                style={{
                  position: "absolute",
                  padding: "8px 30px",
                  bottom: "-50px",
                  right: "-50px",
                  background: "#f9f9f9",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => (window.location.href = "/signout")}
              >
                Log Out
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Toolbar;

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";
import Aux from "../../../hoc/Auxiliary";

const NavigationItems = (props) => {
  return (
    <div className="navigation-items">
      <NavigationItem name="Home" icon="fas fa-briefcase fa-2x" link="/" />
      {props.authenticated ? (
        <Aux>
          <NavigationItem name="Personal" icon="fas fa-home fa-2x" link="/personal" />
          <NavigationItem
            name="Notifications"
            icon="fas fa-bell fa-2x"
            link="/notifications"
          />
          <NavigationItem
            name="Log Out"
            icon="fas fa-sign-out-alt fa-2x"
            link="/signout"
          />
        </Aux>
      ) : (
        <NavigationItem
          name="Sign In"
          icon="fas fa-user fa-2x"
          link="/signin"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataUser: state.auth.dataUser,
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, null)(NavigationItems);

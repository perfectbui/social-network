import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/action/index";

const SignOut = (props) => {
  useEffect(() => {
    Cookies.remove("headerAndPayload");
    props.removeAuth();
    return () => {};
  }, []);
  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAuth: (dataUser) => dispatch(actions.removeAuth()),
  };
};

export default connect(null, mapDispatchToProps)(SignOut);
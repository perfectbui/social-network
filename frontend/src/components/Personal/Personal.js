import React, { useState, useEffect } from "react";

import "./Personal.css";
import Form from "../Form/Form";
import Posts from "./Posts/Posts";
import Cookies from "js-cookie";
import Axios from "axios";
import { parseJwt } from "../../utils";
import { connect, useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/action/index";
import Introduce from "./Introduce/Introduce";
import { getPostsPersonalRequest } from "../../store/action/index";
import Spinner from "../UI/Spinner/Spinner";

const Personal = (props) => {
  const [openPost, setOpenPost] = useState(false);
  const dispatch = useDispatch();
  const [loadingUpAvt, setLoadingUpAvt] = useState(false);
  const [image, setImage] = useState();
  const { data, loadingPosts } = useSelector((state) => state.postsPersonal);
  //   const { loadingComment } = useSelector((state) => state.postComment);

  useEffect(() => {
    console.log("personal ne")
    const dataUser = parseJwt(Cookies.get("headerAndPayload"));
    props.saveAuth(dataUser);
    dispatch(getPostsPersonalRequest(dataUser.email));
    // Axios({
    // 	method: 'get',
    // 	url: '/api/posts/' + dataUser.email,
    // 	headers: {
    // 		'X-Requested-with': 'XMLHttpRequest',
    // 	},
    // })
    // 	.then((response) => {
    // 		console.log(response);
    // 		setDataPost(response.data.posts);
    // 	})
    // 	.catch((error) => {
    // 		console.log(error);
    // 	});
    return () => {};
  }, []);

  const openPostHandler = () => {
    setOpenPost(true);
  };

  const closePostHandler = () => {
    setOpenPost(false);
  };

  const uploadImage = (event) => {
    event.preventDefault();
    document.getElementById("upload-avt").click();
  };

  const uploadAvatar = (file) => {
    setLoadingUpAvt(true);
    const formData = new FormData();
    formData.append("image", file);
    Axios({
      method: "post",
      url: "/api/profile/uploadAvatar",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  return (
    <React.Fragment>
      {/* {loadingPosts || loadingComment ? <Spinner /> : null} */}
      {loadingPosts ? <Spinner /> : null}
      {loadingUpAvt ? <Spinner /> : null}
      <div className="img-wrap">
        <img
          style={{objectFit:'cover'}}
          className="img-cover"
          src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/125770736_2777645972504164_5858733215490549563_o.jpg?_nc_cat=100&ccb=2&_nc_sid=e3f864&_nc_ohc=h1kMLv7jaJwAX-6R_mr&_nc_ht=scontent.fsgn5-5.fna&oh=0c8a39075fdac7a49abb59878f0c5a1c&oe=5FFAB948"
          alt="img-cover"
        />
        <div className="img-avt">
          <img
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid white",
            }}
            src={props.dataUser ? props.dataUser.avatar : null}
            alt="img-avt"
          />
          <i
            className="fas fa-camera"
            onClick={uploadImage}
            htmlFor="upload-avt"
          ></i>
          <input
            id="upload-avt"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={(event) => uploadAvatar(event.target.files[0])}
          />
        </div>
      </div>
      <div className="personal">
        {props.dataUser ? <Introduce dataUser={props.dataUser} /> : null}
        <div className="content">
          <div className="post-wrap">
            <i className="fas fa-edit fa-lg" />
            {/* <input placeholder="Start a Post" onClick={openPostHandler} /> */}
            <button onClick={openPostHandler}>Start a Post</button>
          </div>
          {openPost ? <Form dataUser={props.dataUser} click={closePostHandler} show /> : null}
          {data ? <Posts posts={data.posts} personal /> : null}
        </div>
        <div className="recommend">
          <h2>Add to your feed</h2>
          <div className="list-company-recommend">
            <li className="company-recommend">
              <img src="https://i.chungta.vn/2017/12/22/LogoFPT-2017-copy-3042-1513928399.jpg" />
              <span>Financing Promoting Technology</span>
            </li>
            <li className="company-recommend">
              <img src="data:image/png;base64,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" />
              <span>JV IT COMPANY</span>
            </li>
            <li className="company-recommend">
              <img src="data:image/png;base64,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" />
              <span>THAI BINH COMPANY</span>
            </li>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAuth: (dataUser) => dispatch(actions.saveAuth(dataUser)),
  };
};

const mapStateToProps = (state) => {
  return {
    dataUser: state.auth.dataUser,
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Personal);

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
  const { data, loadingPosts, listRecommendFriend } = useSelector(
    (state) => state.postsPersonal
  );
  //   const { loadingComment } = useSelector((state) => state.postComment);

  useEffect(() => {
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
          style={{ objectFit: "cover", boxShadow: "0 0 5px 5px #cfcfcf" }}
          className="img-cover"
          src="https://media.ex-cdn.com/EXP/media.vntravellive.com/files/news/2019/10/23/den-cuc-bac-ngam-cuc-quang-120810.jpg"
          alt="img-cover"
        />
        <div className="img-avt">
          <img
            style={{
              objectFit: "cover",
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
          <p>{props.dataUser ? props.dataUser.userName : null}</p>
        </div>
      </div>
      <div className="personal">
        {props.dataUser ? <Introduce personal dataUser={props.dataUser} /> : null}
        <div className="content">
          <div className="post-wrap">
            <i className="fas fa-edit fa-lg" />
            {/* <input placeholder="Start a Post" onClick={openPostHandler} /> */}
            <button onClick={openPostHandler}>Start a Post</button>
          </div>
          {openPost ? (
            <Form dataUser={props.dataUser} click={closePostHandler} show />
          ) : null}
          {data ? <Posts posts={data} personal /> : null}
        </div>
        <div className="recommend">
          <h2>Add to your feed</h2>
          <div className="list-friend-recommend">
            {listRecommendFriend
              ? listRecommendFriend.map((friend) => (
                  <li className="friend-recommend" onClick={()=>props.history.push("/friend/"+friend.email)}>
                    <img src={friend.avatar} alt="avt" />
                    <span>{friend.userName}</span>
                  </li>
                ))
              : null}
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

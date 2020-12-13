import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import "./Home.css";
import Posts from "../Personal/Posts/Posts";
import Spinner from "../UI/Spinner/Spinner";
import { getPostsHomeRequest } from "../../store/action/index";

const Home = (props) => {
  const { data, loadingPosts } = useSelector((state) => state.postsHome);
  // const { loadingComment } = useSelector((state) => state.postComment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsHomeRequest());
    return () => {};
  }, []);
  return (
    <React.Fragment>
      {/* {loadingPosts || loadingComment ? <Spinner /> : null} */}
      {loadingPosts ? <Spinner/> :null}
      <div className="home">{data ? <Posts posts={data.posts} /> : null}</div>
    </React.Fragment>
  );
};

export default Home;

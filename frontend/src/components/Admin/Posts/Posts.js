import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import dateFormat from "dateformat";
import {
  getPostsHomeRequest,
  getPostsPersonalRequest,
} from "../../../store/action/index";

import "./Posts.css";

const Posts = () => {
  const [listPost, setListPost] = useState();
  const { dataUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    Axios({
      method: "get",
      url: "/api/admin/posts",
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        if(response.data.length>0)  setListPost(response.data);
      })
      .catch((error) => console.log(error));
    return () => {};
  }, []);

  const deletePost = (event, idDeletedPost) => {
    event.preventDefault();
    Axios({
      method: "delete",
      url: "/api/admin/posts",
      data: { idDeletedPost },
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        setListPost(response.data);
        dispatch(getPostsHomeRequest());
        dispatch(getPostsPersonalRequest(dataUser.email));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <table className="table-posts">
        <tr>
          <th>ID</th>
          <th>Author</th>
          <th>Comments</th>
          <th>Likes</th>
          <th>Shares</th>
          <th>Time Created</th>
          <th>Delete</th>
        </tr>
        {listPost &&
          listPost.map((post) => (
            <tr>
              <td>{post._id}</td>
              <td>{post.author.userName}</td>
              <td>{post.comments.length}</td>
              <td>{post.reacts.likes.length}</td>
              <td>{post.reacts.shares.length}</td>
              <td>
                {dateFormat(
                  post.timeCreated,
                  "dddd, mmmm dS, yyyy, h:MM:ss TT"
                )}
              </td>
              <td>
                <i
                  onClick={(event) => deletePost(event, post._id)}
                  className="fas fa-trash"
                  style={{ color: "red", cursor: "pointer" }}
                ></i>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default Posts;

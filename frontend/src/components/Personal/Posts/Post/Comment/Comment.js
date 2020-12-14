import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../../../UI/Spinner/Spinner";
import Axios from "axios";
import "./Comment.css";
import {
  getPostsHomeRequest,
  getPostsPersonalRequest,
  // postComment
} from "../../../../../store/action/index.js";

const Comment = (props) => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dataUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (document.getElementById("delete-comment-icon")) {
      document.getElementById("comment").addEventListener("mouseover", () => {
        document.getElementById("delete-comment-icon").style.display = "block";
      });
      document.getElementById("comment").addEventListener("mouseout", () => {
        document.getElementById("delete-comment-icon").style.display = "none";
      });
    }
    return () => {};
  }, []);

  const deleteComment = (event) => {
    event.preventDefault();
    setLoading(true);
    Axios({
      method: "delete",
      url: "/api/posts/delete/comment",
      data: { postId: props.post._id, commentId: props.idComment },
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        setLoading(false);
        dispatch(getPostsHomeRequest());
        dispatch(getPostsPersonalRequest(dataUser.email));
        document.getElementById("comment").style.display = "none";
      })
      .catch((error) => console.log(error));
  };
  return (
    <React.Fragment>
      {loading ? <Spinner /> : null}
      <div id="comment" className="comment">
        <img
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginTop: "5px",
            marginRight: "5px",
            cursor: "pointer",
          }}
          src={props.avatar}
          alt="avatar"
          onClick={() => (window.location.href = "/friend/" + props.email)}
        />
        <div className="comment-content">
          <p
            style={{
              padding: "0 5px",
              fontWeight: 500,
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/friend/" + props.email)}
          >
            {props.userName}
          </p>
          <p style={{ padding: "0 5px" }}>{props.content}</p>
        </div>
        {dataUser &&
        (props.post.author.email === dataUser.email ||
          props.email === dataUser.email) ? (
          <div
            id="delete-comment-icon"
            className="delete-comment-icon"
            onClick={() => setToggleDelete((prevState) => !prevState)}
          >
            <i
              className="fas fa-caret-down"
              style={{
                color: "grey",
                height: "20px",
                width: "20px",
              }}
            ></i>
            {toggleDelete ? (
              <p
                onClick={deleteComment}
                style={{
                  position: "absolute",
                  borderRadius: "5px",
                  backgroundColor: "#dedede",
                  margin: "0",
                  padding: "5px 12px",
                  fontSize: "14px",
                  color: "#00000096",
                }}
              >
                Delete
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default Comment;

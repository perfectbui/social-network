import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Comment from "./Comment/Comment";
import Spinner from "../../../UI/Spinner/Spinner";
import "./Post.css";
import {
  getPostsHomeRequest,
  getPostsPersonalRequest,
  // postComment
} from "../../../../store/action/index";

const Post = (props) => {
  const [loading, setLoading] = useState(false);
  const [contentComment, SetContentComment] = useState();
  const [listComment, setListComment] = useState(props.post.comments);
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [numShares, setNumShares] = useState(0);
  const [allowComment, setAllowComment] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const { dataUser } = useSelector((state) => state.auth);
  // const { loadingComment } = useSelector((state) => state.postComment);
  const dispatch = useDispatch();

  useEffect(() => {
    setNumLikes(props.post.reacts.likes.length);
    setNumShares(props.post.reacts.shares.length);
    if (dataUser) {
      const liked = props.post.reacts.likes.filter(
        (data) => dataUser.email === data.user.email
      );
      const shared = props.post.reacts.shares.filter(
        (data) => dataUser.email === data.user.email
      );
      if (liked.length !== 0) {
        setLiked(true);
      }
      if (shared.length !== 0) {
        setShared(true);
      }
    }
    return () => {};
  }, []);

  const likeHandler = (event) => {
    event.preventDefault();
    if (!dataUser) {
      alert("You must login to react this post ♥");
    } else {
      Axios({
        method: "post",
        url: "/api/posts/like",
        data: { postId: props.post._id },
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then((response) => {
          if (liked) setNumLikes((prevState) => prevState - 1);
          else setNumLikes((prevState) => prevState + 1);
          setLiked((prevState) => {
            return !prevState;
          });
          dispatch(getPostsHomeRequest());
          dispatch(getPostsPersonalRequest(dataUser.email));
        })
        .catch((error) => {
          console.log("react like failed");
        });
    }
  };

  const commentHandler = (event) => {
    event.preventDefault();
    if (!dataUser) {
      alert("You must login to comment this post ♥");
    } else {
      setAllowComment((prevState) => {
        return !prevState;
      });
    }
  };

  const shareHandler = (event) => {
    event.preventDefault();
    if (!dataUser) {
      alert("You must login to share this post ♥");
    } else {
      Axios({
        method: "post",
        url: "/api/posts/share",
        data: { postId: props.post._id },
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then((response) => {
          if (shared) setNumShares((prevState) => prevState - 1);
          else setNumShares((prevState) => prevState + 1);
          setShared((prevState) => {
            return !prevState;
          });
          dispatch(getPostsHomeRequest());
          dispatch(getPostsPersonalRequest(dataUser.email));
        })
        .catch((error) => {
          console.log("react share failed");
        });
    }
  };

  const writeCommentHandler = (event) => {
    if (event.keyCode === 13 && dataUser) {
      event.preventDefault();
      setLoading(true);
      document.querySelector(".comment-write textarea").blur();
      SetContentComment("");
      // dispatch(postComment(props.post._id,contentComment,dataUser.email))
      Axios({
        method: "post",
        url: "/api/posts/comment",
        data: { postId: props.post._id, contentComment: contentComment },
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then((response) => {
          dispatch(getPostsHomeRequest());
          dispatch(getPostsPersonalRequest(dataUser.email));
          setListComment([
            ...listComment,
            { user: dataUser, content: contentComment },
          ]);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  };

  const deletePost = (event) => {
    event.preventDefault();
    setLoading(true);
    Axios({
      method: "delete",
      url: "/api/posts/delete",
      data: { postId: props.post._id },
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        setLoading(false);
        dispatch(getPostsHomeRequest());
        dispatch(getPostsPersonalRequest(dataUser.email));
        document.getElementById("post").style.display = "none";
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      {loading ? <Spinner /> : null}
      <div className="post" id="post">
        {dataUser &&
        dataUser.email !== props.post.author.email &&
        props.personal ? (
          <p className="post-shared">{dataUser.userName} shared this post</p>
        ) : null}
        <div className="introduce-user">
          <img
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginRight: "5px",
              cursor: "pointer",
            }}
            src={props.post.author.avatar}
            alt="avatar"
            onClick={() =>
              (window.location.href = "/friend/" + props.post.author.email)
            }
          />
          <div className="name-date">
            <span
              style={{ cursor: "pointer" }}
              onClick={() =>
                (window.location.href = "/friend/" + props.post.author.email)
              }
            >
              {props.post.author.userName}
            </span>
            <span className="date">
              {dateFormat(
                props.post.timeCreated,
                "dddd, mmmm dS, yyyy, h:MM:ss TT"
              )}
            </span>
          </div>
          {dataUser &&
          (
            props.post.author.email === dataUser.email ||
            props.post.reacts.shares.filter(
              (post) => post.user.email === dataUser.email
            )
          ).length > 0 ? (
            <div
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
                  onClick={deletePost}
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
        <div className="content-post">{props.post.content}</div>
        {props.post.image ? (
          <img
            style={{ objectFit: "cover" }}
            src={props.post.image}
            alt="img-post"
          />
        ) : null}
        <div className="comment-post">
          <div className="comment-react">
            <div
              className="persons-react"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                {numLikes > 0 ? (
                  <i
                    className="fas fa-thumbs-up"
                    style={{ color: "Dodgerblue", marginRight: "2px" }}
                  />
                ) : (
                  ""
                )}
                {liked
                  ? ` You and ${numLikes - 1} other persons`
                  : `${numLikes} likes`}
              </div>
              <div className="comment-share">
                <span>{listComment.length} comment</span>
                <span>{numShares} share</span>
              </div>
            </div>
            <div className="navbar-react">
              {liked ? (
                <button onClick={likeHandler}>
                  <i
                    className="far fa-thumbs-up"
                    style={{ color: "Dodgerblue" }}
                  />{" "}
                  <span style={{ color: "Dodgerblue" }}>Like</span>
                </button>
              ) : (
                <button onClick={likeHandler}>
                  <i className="far fa-thumbs-up" /> <span>Like</span>
                </button>
              )}
              <button onClick={commentHandler}>
                <i className="far fa-comment" /> Comments
              </button>
              {shared ? (
                <button onClick={shareHandler}>
                  <i className="far fa-share" style={{ color: "red" }} />{" "}
                  <span style={{ color: "red" }}>Share</span>
                </button>
              ) : (
                <button onClick={shareHandler}>
                  <i className="far fa-share" /> <span>Share</span>
                </button>
              )}
            </div>
          </div>
          <div className="list-comment">
            {listComment.map((comment) => (
              <Comment
                email={comment.user.email}
                idComment={comment._id}
                post={props.post}
                key={comment._id}
                avatar={comment.user.avatar}
                content={comment.content}
                userName={comment.user.userName}
              />
            ))}
          </div>
          {allowComment ? (
            <div
              className="comment-write"
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "15px",
              }}
            >
              <img
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                src={dataUser.avatar}
                alt="avatar"
              />
              <textarea
                placeholder="Write comment..."
                onChange={(event) => SetContentComment(event.target.value)}
                onKeyDown={writeCommentHandler}
                value={contentComment}
              />
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Post;

import * as actionTypes from "./actionTypes";

import Axios from "axios";

export const getPostsPersonalRequest = (email) => {
  return (dispatch) => {
    Axios({
      method: "get",
      url: "/api/posts/" + email,
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        dispatch({
          type: actionTypes.GET_POSTS_PERSONAL_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("get posts personal action failed")
        dispatch({ type: actionTypes.GET_POSTS_PERSONAL_FAIL, payload: error });
      });
  };
};

export const getPostsHomeRequest = (email) => {
  return (dispatch) => {
    Axios({
      method: "get",
      url: "/api/posts",
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        dispatch({
          type: actionTypes.GET_POSTS_HOME_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("get posts home action failed")
        dispatch({ type: actionTypes.GET_POSTS_HOME_FAIL, payload: error });
      });
  };
};

export const postComment = (postId, contentComment,email) => {
  return (dispatch) => {
    dispatch({type:actionTypes.POST_COMMENT_REQUEST})
    Axios({
        method: "post",
        url: "/api/posts/comment",
        data: { postId: postId, contentComment: contentComment },
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then(async (response) => {
          dispatch(getPostsHomeRequest());
          dispatch(getPostsPersonalRequest(email));
          dispatch({type:actionTypes.POST_COMMENT_SUCCESS})
        })
        .catch((error) => {
            console.log("Post comment action failed")
            dispatch({type:actionTypes.POST_COMMENT_FAIL,payload:error})
        });
  };
};

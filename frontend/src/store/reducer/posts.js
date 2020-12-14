import * as actionTypes from "../action/actionTypes";

export const getPostsPersonalReducer = (
  state = { loadingPosts: true },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_PERSONAL_SUCCESS:
      return {
        data: action.payload.posts,
        listRecommendFriend:action.payload.listRecommendFriend,
        loadingPosts: false,
      };
    case actionTypes.GET_POSTS_PERSONAL_FAIL:
      return {
        error: true,
        loadingPosts: false,
      };
    default:
      return state;
  }
};

export const getPostsFriendReducer = (
  state = { loadingPosts: true },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_FRIEND_SUCCESS:
      return {
        data: action.payload.posts,
        listRecommendFriend:action.payload.listRecommendFriend,
        loadingPosts: false,
      };
    case actionTypes.GET_POSTS_FRIEND_FAIL:
      return {
        error: true,
        loadingPosts: false,
      };
    default:
      return state;
  }
};

export const getPostsHomeReducer = (state = { loadingPosts: true }, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_HOME_SUCCESS:
      return {
        data: action.payload,
        loadingPosts: false,
      };
    case actionTypes.GET_POSTS_HOME_FAIL:
      return {
        error: true,
        loadingPosts: false,
      };
    default:
      return state;
  }
};

export const postCommentReducer = (
  state = { loadingComment: false },
  action
) => {
  switch (action.type) {
    case actionTypes.POST_COMMENT_REQUEST:
      return {
        loadingComment: true,
      };
    case actionTypes.POST_COMMENT_SUCCESS:
      return {
        loadingComment: false,
      };
    case actionTypes.POST_COMMENT_FAIL:
      return {
        loadingComment: false,
        error: true,
      };
    default:
      return state;
  }
};

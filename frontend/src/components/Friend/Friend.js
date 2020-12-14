import React, { useState, useEffect } from "react";

import "../Personal/Personal.css";
import Form from "../Form/Form";
import Posts from "../Personal/Posts/Posts";
import Cookies from "js-cookie";
import Axios from "axios";
import { parseJwt } from "../../utils";
import { connect, useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/action/index";
import Introduce from "../Personal/Introduce/Introduce";
import { getPostsFriendRequest } from "../../store/action/index";
import Spinner from "../UI/Spinner/Spinner";

const Friend = (props) => {
  const dispatch = useDispatch();
  const [dataFriend,setDataFriend] = useState();
  const { data, loadingPosts,listRecommendFriend } = useSelector((state) => state.postsFriend);

  useEffect(() => {
    
    // const dataUser = parseJwt(Cookies.get("headerAndPayload"));
    // props.saveAuth(dataUser);
    dispatch(getPostsFriendRequest(props.match.params.email));
    Axios({
    	method: 'get',
    	url: '/api/profile/friend/' + props.match.params.email,
    	headers: {
    		'X-Requested-with': 'XMLHttpRequest',
    	},
    })
    	.then((response) => {
    		setDataFriend(response.data.dataFriend);
    	})
    	.catch((error) => {
    		console.log(error);
    	});
    return () => {};
  }, []);

  return (
    <React.Fragment>
      {/* {loadingPosts || loadingComment ? <Spinner /> : null} */}
      {loadingPosts ? <Spinner /> : null}
      <div className="img-wrap">
        <img
          style={{objectFit:'cover',boxShadow: '0 0 5px 5px #cfcfcf'}}
          className="img-cover"
          src="https://media.ex-cdn.com/EXP/media.vntravellive.com/files/news/2019/10/23/den-cuc-bac-ngam-cuc-quang-120810.jpg"
          alt="img-cover"
        />
        <div className="img-avt">
          <img
            style={{
              objectFit:'cover',
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid white",
            }}
            src={dataFriend ? dataFriend.avatar : null}
            alt="img-avt"
          />
          <p>{dataFriend ? dataFriend.userName : null}</p>
        </div>
      </div>
      
      <div className="personal">
        {dataFriend ? <Introduce dataUser={dataFriend} /> : null}
        <div className="content">
          {data ? <Posts personal posts={data}  /> : null}
        </div>
        <div className="recommend">
          <h2>Add to your feed</h2>
          <div className="list-friend-recommend">
          {listRecommendFriend
              ? listRecommendFriend.map((friend) => (
                  <li className="friend-recommend" onClick={()=>window.location.href="/friend/"+friend.email}>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     saveAuth: (dataUser) => dispatch(actions.saveAuth(dataUser)),
//   };
// };

// const mapStateToProps = (state) => {
//   return {
//     dataUser: state.auth.dataUser,
//     authenticated: state.auth.authenticated,
//   };
// };

export default Friend;

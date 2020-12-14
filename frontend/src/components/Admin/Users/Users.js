import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

import {
  getPostsHomeRequest,
  getPostsPersonalRequest,
} from "../../../store/action/index";

import "./Users.css";

const Users = () => {
  const [listUser, setListUser] = useState();
  const { dataUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const deleteUser = (event, idDeletedUser) => {
  //   event.preventDefault();
  //   Axios({
  //     method: "delete",
  //     url: "/api/admin/users",
  //     data:{idDeletedUser},
  //     headers: {
  //       "X-Requested-with": "XMLHttpRequest",
  //     },
  //   })
  //     .then((response) => {
  //       setListUser(response.data);
  //       dispatch(getPostsHomeRequest());
  //       dispatch(getPostsPersonalRequest(dataUser.email));
  //     })
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    Axios({
      method: "get",
      url: "/api/admin/users",
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        setListUser(response.data);
      })
      .catch((error) => console.log(error));
    return () => {};
  }, []);
  return (
    <div>
      <table className="table-users">
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Age</th>
          <th>Address</th>
          <th>Phone</th>
          {/* <th>Delete</th> */}
        </tr>
        {listUser &&
          listUser.map((user) => (
            <tr>
              <td>{user._id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              {/* <td>
                <i
                  onClick={(event) => deleteUser(event, user._id)}
                  className="fas fa-trash"
                  style={{ color: "red", cursor: "pointer" }}
                ></i>
              </td> */}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default Users;

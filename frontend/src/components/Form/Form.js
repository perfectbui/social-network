import React, { useState, useEffect } from "react";

import "./Form.css";
import Aux from "../../hoc/Auxiliary";
import Backdrop from "../UI/Backdrop/Backdrop";
import Axios from "axios";
import Spinner from "../UI/Spinner/Spinner";

const Form = (props) => {
  const [image, setImage] = useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const uploadImageHandler = () => {
    document.getElementById("upload-photo").click();
  };

  useEffect(() => {
    if (document.getElementById("spinner")) {
      document.getElementById("spinner").style.top = "0";
    }
    return () => {};
  }, [loading]);

  const postHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      Axios({
        method: "post",
        url: "/api/posts/uploadImg",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then((response) => {
          const image = response.data.imageUrl;

          Axios({
            method: "post",
            url: "/api/posts",
            data: { content, image },
            headers: {
              "X-Requested-with": "XMLHttpRequest",
            },
          })
            .then((response) => {
              window.location.reload();
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    } else {
      Axios({
        method: "post",
        url: "/api/posts",
        data: { content, image },
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Aux>
      {loading ? <Spinner /> : null}
      <Backdrop show={props.show} click={props.click} />
      <form className="form" id="form-create-post">
        <h3
          style={{
            color: "#00000096",
            margin: "0",
            padding: "10px",
            borderBottom: "1px solid rgb(201, 197, 197)",
          }}
        >
          CREATE POST
        </h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              maxWidth: "40px",
              maxHeight: "40px",
              borderRadius: "50%",
              marginTop: "5px",
              marginRight: "5px",
            }}
            src={props.dataUser.avatar}
            alt="avatar"
          />
          <p style={{ paddingLeft: "2px", fontWeight: 500, fontSize: "18px" }}>
            {props.dataUser.userName}
          </p>
        </div>
        <textarea
          placeholder="What are you thinking...?"
          onChange={(event) => setContent(event.target.value)}
        />
        <div
          className="option-post"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            border: "solid rgb(201, 197, 197) 1px",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "2px 2px 10px rgb(223, 216, 216)",
          }}
        >
          <p style={{ margin: "0", color: "#00000096" }}>More Options: </p>
          <i
            className="fas fa-images fa-2x"
            style={{
              color: "green",
              cursor: "pointer",
              "&:hover": { backgroundColor: "grey" },
              margin: "0 10px",
            }}
            onClick={uploadImageHandler}
            htmlFor="upload-photo"
          />
          <input
            id="upload-photo"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
        <button className="btn-post" onClick={(event) => postHandler(event)}>
          POST
        </button>
      </form>
    </Aux>
  );
};

export default Form;

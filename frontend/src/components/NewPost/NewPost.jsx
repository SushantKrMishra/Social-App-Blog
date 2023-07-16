import React, { useEffect, useState } from "react";
import "./NewPost.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { createNewPost } from "../../Actions/Post";
import { toast } from "react-toastify";
import { loadUser } from "../../Actions/User";
const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.like);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1200,
        closeButton: true,
        pauseOnHover: false,
      });
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1200,
        closeButton: true,
        pauseOnHover: false,
      });
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
    navigate("/account");
  };
  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="Post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;

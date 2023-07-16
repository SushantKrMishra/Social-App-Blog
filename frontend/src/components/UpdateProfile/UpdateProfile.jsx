import "./UpdateProfile.css";
import React, { useEffect, useState } from "react";
import { Typography, Button, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../Actions/User";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
    
    navigate('/account')
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
    if (updateError) {
      toast.error(updateError, {
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
  }, [dispatch, error, updateError, message]);
  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <Avatar
          src={avatarPrev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Name"
          required
          className="updateProfileInputs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="updateProfileInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;

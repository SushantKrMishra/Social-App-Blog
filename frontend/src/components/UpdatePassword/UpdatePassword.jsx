import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser, updatePassword } from "../../Actions/User";
const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { error, loading, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword));
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
      dispatch(logoutUser());
    }
  }, [dispatch, error, message]);
  return (
    <div className="updatePassword">
      <form action="" className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="password"
          placeholder="Old Password"
          required
          className="updatePasswordInputs"
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
        />
        <input
          type="password"
          className="updatePasswordInputs"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />

        <Button disabled={loading} type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;

import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/User";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { error, loading, message } = useSelector((state) => state.like);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
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
        autoClose: 3000,
        closeButton: true,
        pauseOnHover: false,
      });
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);
  return (
    <div className="resetPassword">
      <form action="" className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Reset Password
        </Typography>

        <input
          type="password"
          className="resetPasswordInputs"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        
        <Link to="/">
          <Typography>Login</Typography>
        </Link>
          <Typography>or</Typography>
          <Link to="/forgot/password">
          <Typography>Request another Token</Typography>
        </Link>
        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;

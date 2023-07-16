import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.like);
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
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
    <div className="forgotPassword">
      <form action="" className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          className="forgotPasswordInputs"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;

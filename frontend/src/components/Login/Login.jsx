import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);
  const loginHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(email, password));
    navigate("/");
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
  return (
    <div className="login">
      <form action="" className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Link to="/forgot/password">
          <Typography variant="h6">Forgot Password</Typography>
        </Link>
        <Button type="submit">Login</Button>
        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};
export default Login;

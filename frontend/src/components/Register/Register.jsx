import React, { useEffect, useState } from "react";
import "./Register.css";
import { Typography, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
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
  }, [dispatch, error]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Name"
          required
          className="registerInputs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="registerInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="registerInputs"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Link to="/">
          <Typography> Already have Account? Login Here...</Typography>{" "}
        </Link>
        <Button disabled={loading} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;

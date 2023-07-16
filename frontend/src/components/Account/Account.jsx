import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import User from "../User/User";
const Account = () => {
  const dispatch = useDispatch();
  const {
    user,
    loading: userLoading,
    error: loginError,
  } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const logoutHandler = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out Successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1200,
      closeButton: true,
      pauseOnHover: false,
    });
  };
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
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
    if (loginError) {
      toast.error(loginError, {
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
  }, [likeError, message, dispatch, error, loginError]);
  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };
  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 && posts[0]._id ? (
          posts.map((post) => (
            <Post
              key={post._id}
              caption={post.caption}
              postId={post._id}
              postImage={post.image?.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner?.avatar?.url}
              ownerId={post?.owner?._id}
              ownerName={post?.owner?.name}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any posts.</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>

          <Typography>{user.posts.length}</Typography>
        </div>
        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>
        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
          disabled={deleteLoading}
        >
          Delete My Profile
        </Button>
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar?.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no Followers
              </Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar?.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You are not Following anybody!
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;

import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts, getAllUsers } from "../../Actions/User";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { user } = useSelector((state) => state.user);
  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );
  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    if (likeError) {
      toast.error(likeError, {
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
    if (user) {
      toast.success("Logged in Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1200,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  }, [likeError, message, dispatch, error, user]);

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              caption={post.caption}
              postId={post._id}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerId={post.owner._id}
              ownerName={post.owner.name}
            />
          ))
        ) : (
          <Typography variant="h6">No Posts Yet</Typography>
        )}
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;

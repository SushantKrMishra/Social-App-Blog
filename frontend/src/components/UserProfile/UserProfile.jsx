import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followAndUnFollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/User";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import User from "../User/User";
const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const params = useParams();
  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        }else{
          setFollowing(false);

        }
      });
    }
  }, [user, me._id, params.id]);
  const followHandler =async() => {
    setFollowing(!following);
    await dispatch(followAndUnFollowUser(user._id));
    dispatch(getUserProfile(params.id));
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
    if (userError) {
      toast.error(userError, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1200,
        closeButton: true,
        pauseOnHover: false,
      });
      dispatch({ type: "clearErrors" });
    }
    if (followError) {
      toast.error(followError, {
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
  }, [message, dispatch, error, followError, userError]);

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
              tab="userHome"
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any posts.</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
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
            {myProfile ? null : (
              <Button
                variant="contained"
                style={{ background: following ? "red" : "" }}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}

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
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

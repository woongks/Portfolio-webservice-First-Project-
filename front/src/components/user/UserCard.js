import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { Card, Row, Button, Col, useAccordionButton } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import usercard from "../style/UserCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faF } from "@fortawesome/free-solid-svg-icons";

// import axios, { Axios } from "axios";

function UserCard({
  user,
  setIsEditing,
  isEditable,
  isNetwork,
  setChangingPW,
}) {
  const navigate = useNavigate();
  //변수에 넣는것들은 명확하게.. 0...false...  --likes
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const userState = useContext(UserStateContext);
  //follow
  // const [following, setFollowing] = useState(0);
  const [follower, setFollower] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [f4f, setF4f] = useState(false);

  //수정 필요 ㅠㅠ fetchLike
  useEffect(() => {
    //likes
    async function fetchLikeList() {
      if (!user) return;
      try {
        const res = await Api.get("likelist", user.id);
        if (res.data.giveLike.find((v) => v === userState.user.id)) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
        setLikes(res.data.likes);
      } catch (e) {
        console.log(e);
      }
    }

    fetchLikeList();
  }, [isLiked, user]);

  //수정 필요 ㅠㅠ fetchFollow
  useEffect(() => {
    //follow
    async function fetchFollowList() {
      if (!user) return;
      try {
        const res = await Api.get("followlist", user.id);
        if (res.data.follower.find((v) => v === userState.user.id)) {
          if (res.data.following.find((v) => v === userState.user.id)) {
            setF4f(true);
          } else setF4f(false);
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
          setF4f(false);
        }
        setFollower(res.data.followerNumber);
      } catch (e) {
        console.log(e);
      }
    }
    fetchFollowList();
  }, [user, isFollowed, f4f]);

  const handleLikes = async () => {
    if (user.id === userState.user.id) return;
    //수정
    try {
      if (isLiked) {
        await Api.post("like/delete", {
          giveLike: userState.user.id,
          getLike: user.id,
        });
      } else {
        await Api.post("like/create", {
          giveLike: userState.user.id,
          getLike: user.id,
        });
      }
      setIsLiked(!isLiked);
    } catch (e) {
      console.log(e);
    }
  };
  const handleFollow = async () => {
    if (user.id === userState.user.id) return;
    //수정
    try {
      if (isFollowed) {
        await Api.post("follow/delete", {
          follower: user.id,
          following: userState.user.id,
        });
        setIsFollowed(false);
      } else if (!isFollowed) {
        await Api.post("follow/create", {
          follower: user.id,
          following: userState.user.id,
        });
        setIsFollowed(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const stateReset = () => {
    setIsEditing(true);
    setChangingPW(false);
  };
  return (
    <div className={usercard.ucContainer}>
      <div>
        <div className={usercard.ucBox}>
          <p className={usercard.ucName}>{user?.name}</p>
          <p className={usercard.nUserCardEmail}>{user?.email}</p>
          <p>{user?.description}</p>
          <p className={usercard.ucIcon}>
            <FontAwesomeIcon icon={faHeart} size="1x" />_{likes}
          </p>
          <p className={usercard.ucIcon}>
            <FontAwesomeIcon icon={faF} size="1x" />
            ollow_{follower}
          </p>
          {!isEditable && (
            <p className={usercard.ucIcon}>
              <FontAwesomeIcon icon={faF} size="1x" />4
              <FontAwesomeIcon icon={faF} size="1x" />_{f4f ? "O" : "X"}
            </p>
          )}
        </div>
        {isEditable && (
          <div className={usercard.ucBtnBox}>
            <button className={usercard.ucEdit} onClick={stateReset}>
              Edit
            </button>
            <button
              className={usercard.ucPw}
              onClick={() => setChangingPW(true)}
            >
              Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;

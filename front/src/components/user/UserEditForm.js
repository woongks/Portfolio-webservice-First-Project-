import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userEdcard from "../style/UserCard.module.scss";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  const isValid = user.email === email ? false : true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  //회원탈퇴 기능
  const navigate = useNavigate();

  const userDelete = async (e) => {
    if (window.confirm("Are you sure?")) {
      await Api.delete("users", user.id);
      await navigate("/main");
    } else return;
  };

  return (
    <div className={userEdcard.ucContainer}>
      <div className={userEdcard.ucBox}>
        <form onSubmit={handleSubmit}>
          <input
            className={userEdcard.usInput}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={userEdcard.usInput}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={userEdcard.usInput}
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={userEdcard.ucBtnBox}>
            <button
              lassName={userEdcard.ucEdit}
              variant="primary"
              type="submit"
            >
              Submit
            </button>
            <button
              className={userEdcard.ucEdit}
              variant="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button className={userEdcard.ucEditDanger} onClick={userDelete}>
              WithDraw
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEditForm;

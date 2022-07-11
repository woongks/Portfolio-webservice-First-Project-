import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pwForm from "../style/UserCard.module.scss";

import * as Api from "../../api";

function ChangePasswordForm({ user, setChangingPW, setUser }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewpassword, setCheckNewpassword] = useState("");
  const navigate = useNavigate();

  const isPasswordValid = newPassword.length >= 4;
  const isPasswordSame = checkNewpassword === newPassword;
  const CheckAll = isPasswordValid && isPasswordSame;
  ///useMemo... 사용

  const handleSubmit = async (e) => {
    e.preventDefault();
    /////newPassword 랑 checknewPassword 검증

    try {
      console.log(currentPassword);
      const res = await Api.post(`users/currentPassword/${user.id}`, {
        currentPassword,
      });
      console.log(res.data);
      if (res.data.result) {
        await Api.put(`users/${user.id}`, {
          newPassword,
        });
        alert("Password change complete!");
        setChangingPW(false);
        navigate("/");
      } else {
        alert("Passwords do not match");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={pwForm.ucContainer}>
      <div className={pwForm.ucEdBox}>
        <form onSubmit={handleSubmit}>
          <input
            className={pwForm.usInput}
            type="password"
            autoComplete="on"
            placeholder="current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            className={pwForm.usInput}
            type="password"
            placeholder="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {!isPasswordValid ? (
            <p className={pwForm.pwAlert}>
              Your Password Contain at least 4 Characters
            </p>
          ) : (
            <p></p>
          )}
          <input
            className={pwForm.usInput}
            type="password"
            placeholder="check new password"
            onChange={(e) => setCheckNewpassword(e.target.value)}
          />
          {!isPasswordSame ? <p>Passwords do not match</p> : <p></p>}
          <div className={pwForm.ucBtnBox}>
            <button
              className={pwForm.ucEdit}
              variant="primary"
              type="submit"
              disabled={!CheckAll} //// 비밀번호 일치 확인 안되어있을 시 재입력?
            >
              Submit
            </button>
            <button
              className={pwForm.ucEdit}
              variant="secondary"
              onClick={() => setChangingPW(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import styles from "../style/signUpPage.module.scss";
import "../style/styles.css";

import * as Api from "../../api";

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
      });
      window.location.href = "/";
      // 로그인 페이지로 이동함.
      navigate("/");
    } catch (err) {
      alert("Email already in use"); //이메일 중복 방지
      console.log("Fail", err);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <button className={styles.xBtn}>
        <a href="/" className={styles.a}>
          X
        </a>
      </button>
      <div className={styles.line}></div>
      <form onSubmit={handleSubmit}>
        <label>Email : </label>
        <input
          className={styles.signInput}
          type="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid ? (
          <p className={styles.alarm}>Invalid email address format</p>
        ) : (
          <p className={styles.alarm}></p>
        )}
        <label>Password : </label>
        <input
          className={styles.signInput}
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid ? (
          <p className={styles.alarm}>Password Contain at least 4 Characters</p>
        ) : (
          <p className={styles.alarm}></p>
        )}
        <label>Ch Password : </label>
        <input
          className={styles.signInput}
          type="password"
          autoComplete="off"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!isPasswordSame ? (
          <p className={styles.alarm}>비밀번호가 not일치</p>
        ) : (
          <p className={styles.alarm}></p>
        )}
        <label>Name : </label>
        <input
          className={styles.signInput}
          type="text"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!isNameValid ? (
          <p className={styles.alarm}>Name Contain at least 4 Characters</p>
        ) : (
          <p className={styles.alarm}></p>
        )}
      </form>
      <div className={styles.btnDiv}>
        <button onClick={handleSubmit} disabled={!isFormValid}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;

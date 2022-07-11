import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../style/signPage.module.scss";
import * as Api from "../../api";
import { DispatchContext } from "../../App";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  //useState로 email 상태를 생성
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성
  const [password, setPassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data
      const user = res.data;
      // JWT 토큰은 유저 정보의 token
      const jwtToken = user.token;
      console.log(`jwtToken: ${jwtToken}`);
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동
      navigate("/portfolio", { replace: true });
    } catch (err) {
      console.log("Fail\n", err);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <button className={styles.xBtn}>
        <a className={styles.a} href="/">
          X
        </a>
      </button>
      <div className={styles.line}></div>
      <form onSubmit={handleSubmit}>
        <label>Email : </label>
        <input
          className={styles.signInput}
          type="text"
          autoComplete="on"
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
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid ? (
          <p className={styles.alarm}>
            Your Password Contain at least 4 Characters
          </p>
        ) : (
          <p className={styles.alarm}></p>
        )}
      </form>
      <div className={styles.btnDiv}>
        <button onClick={handleSubmit} disabled={!isFormValid}>
          SignIn
        </button>
        {/* <button onClick={() => navigate("/register")}>SignUp</button> */}
      </div>
    </div>
  );
}

export default LoginForm;

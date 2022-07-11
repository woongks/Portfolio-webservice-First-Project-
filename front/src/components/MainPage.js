import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/mainPage.module.scss";
import LoginForm from "./user/LoginForm";
import RegisterForm from "./user/RegisterForm";
import { MainPageContext } from "./MainPageContext";

function MainPage() {
  // const navigate = useNavigate();
  const [isSignIng, setIsSignIng] = useState(false);
  const [isSignUpIng, setIsSignUpIng] = useState(false);
  const signInBtn = useRef();
  const signUpBtn = useRef();
  useEffect(() => {}, [isSignIng]);
  return (
    <MainPageContext.Provider
      value={{ isSignIng, isSignUpIng, setIsSignIng, setIsSignUpIng }}
    >
      <div className={styles.container}>
        <h1>Portfolio</h1>
        {isSignIng ? <LoginForm setIsSignIng={setIsSignIng} /> : null}
        {isSignUpIng ? <RegisterForm setIsSignUpIng={setIsSignUpIng} /> : null}
        <div>
          <button
            ref={signInBtn}
            className={styles.signIn}
            onClick={() => {
              setIsSignIng(!isSignIng);
              signInBtn.current.className = "white";
              signUpBtn.current.className = "white";
            }}
          >
            SignIn
          </button>
          <button
            ref={signUpBtn}
            className={styles.signUp}
            onClick={() => {
              setIsSignUpIng(!isSignUpIng);
              signInBtn.current.className = "white";
              signUpBtn.current.className = "white";
            }}
          >
            SignUp
          </button>
        </div>
      </div>
    </MainPageContext.Provider>
  );
}

export default MainPage;

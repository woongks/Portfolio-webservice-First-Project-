import React, { useContext, Component } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";
import header from "../components/style/Header.module.scss";
import classNames from "classnames";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <nav activeKey={location.pathname}>
      <p className={header.topline} />
      {isLogin && (
        <li className={header.logoutContainer}>
          <Link to="/" onClick={logout} className={header.logout}>
            logOut
          </Link>
        </li>
      )}
      <h1 className={header.title}>Portfolio</h1>

      <li className={header.list1}>
        <Link
          to="/portfolio"
          className={classNames(header.My, {
            [header.active]: location.pathname === "/portfolio",
          })}
        >
          My
        </Link>
        <Link
          to="/network"
          className={classNames(header.Net, {
            [header.active]: location.pathname === "/network",
          })}
        >
          Net
        </Link>
        <Link
          to="/board"
          className={classNames(header.Board, {
            [header.active]: location.pathname === "/board",
          })}
        >
          Board
        </Link>
      </li>
      {isLogin && <li className={header.list2}></li>}
      <p className={header.middleline} />
    </nav>
  );
}

export default Header;

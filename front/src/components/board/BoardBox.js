import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardContext } from "./BoardContext";
import Boards from "./Boards";
import BoardForm from "./BoardForm";
import { UserStateContext } from "../../App";
import styles from "../style/box.module.scss";
import Header from "../Header";
import footer from "../style/Footer.module.css";

function BoardBox() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const userState = useContext(UserStateContext);
  // const isEditable = true;

  return (
    <BoardContext.Provider value={{ boards, setBoards }}>
      <Header />
      <div className={styles.boardBox}>
        <BoardForm />
        <Boards />
      </div>
      <div className={footer.text}>Portfolio</div>
    </BoardContext.Provider>
  );
}

export default BoardBox;

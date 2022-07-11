import React, { useEffect, useState, useContext } from "react";
import * as Api from "../../api";
import Board from "./Board";
import styles from "../style/box.module.scss";
import { BoardContext } from "./BoardContext";

function Boards() {
  const { boards, setBoards } = useContext(BoardContext);
  useEffect(() => {
    Api.get("boardlist").then((res) => setBoards(res.data.boards));
  }, []);

  return (
    <div className={styles.boardsBox}>
      {boards.map((board) => (
        <Board key={board?.id} board={board} />
      ))}
    </div>
  );
}

export default Boards;

import React, { useState, useContext } from "react";
import BoardCard from "./BoardCard";
import BoardForm from "./BoardForm";
import * as Api from "../../api";
import { BoardContext } from "./BoardContext";
import { UserStateContext } from "../../App";

function Board({ board }) {
  const [isEditing, setIsEditing] = useState(false);
  const userState = useContext(UserStateContext);
  const { boards = [], setBoards } = useContext(BoardContext) || {};
  const isEditable = userState.user.id === board.userId ? true : false;
  async function handleDelete(e) {
    if (window.confirm("sure?")) {
      e.preventDefault();
      e.stopPropagation();
      try {
        const boardId = board.id;
        await Api.post("board/delete", {
          boardId: boardId,
          userId: userState.user.id,
        });
        const idx = boards.findIndex((item) => item.id === board.id);
        boards.splice(idx, 1);
        setBoards([...boards]);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <>
      {isEditing ? (
        <BoardForm
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          currentBoard={board}
          setBoards={setBoards}
        />
      ) : (
        <BoardCard
          board={board}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}

export default Board;

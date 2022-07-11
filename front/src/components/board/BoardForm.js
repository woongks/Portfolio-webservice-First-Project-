import React, { useState, useContext } from "react";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { BoardContext } from "./BoardContext";
import styles from "../style/box.module.scss";

const BoardForm = ({ currentBoard, isEditing, setIsEditing }) => {
  const userState = useContext(UserStateContext);
  const [form, setForm] = useState({
    title: currentBoard?.title ? currentBoard.title : "",
    context: currentBoard?.context ? currentBoard.context : "",
  });
  // const { boards = [], setBoards } = useContext(BoardContext) || {};
  const { boards, setBoards } = useContext(BoardContext);

  const handleBoardValue = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //await + then (x)
    try {
      if (setIsEditing) {
        await Api.put(`boards/${currentBoard.id}`, {
          userId: currentBoard.userId,
          title: form.title,
          context: form.context,
        });
        setIsEditing(false);
        // const res = await Api.get("boardlist");
        // setBoards(res.data.boards);
        await Api.get("boardlist").then((res) => setBoards(res.data.boards));
      } else {
        await Api.post("board/create", {
          userId: userState.user.id,
          title: form.title,
          context: form.context,
        });
        // setBoards((prev) => {
        //   return [
        //     ...prev,
        //     {
        //       userId: userState.user.id,
        //       title: form.title,
        //       context: form.context,
        //     },
        //   ];
        // });
        await Api.get("boardlist").then((res) => setBoards(res.data.boards));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={styles.bForm} onSubmit={handleSubmit}>
      <input
        className={styles.boardInput}
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => handleBoardValue("title", e.target.value)}
      />

      <textarea
        className={styles.boardInput}
        type="textarea"
        placeholder="context"
        value={form.context}
        onChange={(e) => handleBoardValue("context", e.target.value)}
      />
      <div className={styles.bFormBtns}>
        <button className={styles.bFormBtn} type="submit">
          Submit
        </button>
        {isEditing && (
          <button
            className={styles.bFormBtn}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            type="button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BoardForm;

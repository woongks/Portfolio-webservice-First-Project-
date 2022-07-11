import { Board } from "../db"
import { v4 as uuidv4 } from "uuid"

class BoardService {
  static addBoard = async ({ userId, context, title }) => {
    const id = uuidv4()
    const newBoard = await Board.addBoard({ id, userId, context, title })
    return newBoard
  }

  static deleteBoard = async ({ boardId, userId }) => {
    const board = await Board.findById({ boardId })
    if (board.userId !== userId) {
      const errorMessage =
        "사용자와 작성자가 다릅니다. 다시 한 번 확인 해주세요."
      return { errorMessage }
    }
    await Board.deleteBoard({ boardId })
    return {
      sataus: "success",
    }
  }

  static updateBoard = async ({ boardId, userId, context, title }) => {
    const board = await Board.findById({ boardId })
    if (!board) {
      const errorMessage = "게시물을 찾을 수 없습니다."
      return { errorMessage }
    }

    if (board.userId !== userId) {
      const errorMessage =
        "사용자와 작성자가 다릅니다. 다시 한 번 확인 해주세요."
      return { errorMessage }
    }

    const updatedBoard = await Board.update(boardId, context, title)
    return updatedBoard
  }

  static findAll = async () => {
    const boards = await Board.findAll()
    if (boards.length === 0) {
      const errorMessage = "게시된 게시물이 하나도 없습니다."
      return { errorMessage }
    }
    return boards
  }

  static findByUserId = async (userId) => {
    const boards = await Board.findByUserId(userId)
    return boards
  }
}

export { BoardService }

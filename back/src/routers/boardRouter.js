import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired.js"

import { BoardService } from "../services/boardService.js"

const boardRouter = Router()
boardRouter.use(loginRequired)

boardRouter.post("/board/create", async (req, res, next) => {
  try {
    const userId = req.body.userId
    const context = req.body.context
    const title = req.body.title
    const newBoard = await BoardService.addBoard({ userId, context, title })
    res.status(200).json({
      newBoard,
    })
  } catch (error) {
    next(error)
  }
})

boardRouter.post("/board/delete", async (req, res, next) => {
  try {
    const userId = req.body.userId
    const boardId = req.body.boardId
    const result = await BoardService.deleteBoard({ boardId, userId })
    if (result.errorMessage) {
      throw new Error(result.errorMessage)
    }
    res.status(200).json({
      ...result,
    })
  } catch (error) {
    next(error)
  }
})

boardRouter.put("/boards/:id", async (req, res, next) => {
  const boardId = req.params.id
  const userId = req.body.userId
  const context = req.body.context
  const title = req.body.title

  const updatedBoard = await BoardService.updateBoard({
    boardId,
    userId,
    context,
    title,
  })

  res.status(200).json({ updatedBoard: updatedBoard })
})

boardRouter.get("/boardlist", async (req, res, next) => {
  try {
    const boards = await BoardService.findAll()
    if (boards.errorMessage) {
      throw new Error(boards.errorMessage)
    }
    res.status(200).json({
      boards,
    })
  } catch (error) {
    next(error)
  }
})

boardRouter.get("/boardlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId
    const boards = await BoardService.findByUserId(userId)

    res.status(200).json(boards)
  } catch (error) {
    next(error)
  }
})

boardRouter.get("/board", (req, res, next) => {
  res.json({
    status: "success",
  })
})

export { boardRouter }

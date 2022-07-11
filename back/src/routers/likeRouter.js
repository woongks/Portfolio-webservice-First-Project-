import is from "@sindresorhus/is"
import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired.js"
import { LikeService } from "../services/likeService.js"

const likeRouter = Router()
likeRouter.use(loginRequired)

likeRouter.post("/like/create", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const giveLike = req.body.giveLike
        const getLike = req.body.getLike

        const newLike = await LikeService.addLike({
            giveLike,
            getLike,
        })

        res.status(201).json(newLike)
    } catch (error) {
        next(error)
    }
})

likeRouter.post("/like/delete", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const giveLike = req.body.giveLike
        const getLike = req.body.getLike

        const newlike = await LikeService.deleteLike({
            giveLike,
            getLike,
        })
        console.log("좋아요를 취소하셨습니다.")
        res.status(201).json(newlike)
    } catch (error) {
        next(error)
    }
})

likeRouter.get("/likelist/:getLike", async function (req, res, next) {
    try {
        const getLike = req.params.getLike
        const likeList = await LikeService.getLikeList({
            getLike,
        })
        res.status(200).json(likeList)
    } catch (error) {
        next(error)
    }
})

export { likeRouter }

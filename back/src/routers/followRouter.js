import is from "@sindresorhus/is"
import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired.js"
import { FollowService } from "../services/followService.js"

const followRouter = Router()
followRouter.use(loginRequired)

followRouter.post("/follow/create", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const { following, follower } = req.body

        const newFollow = await FollowService.addFollow({
            following,
            follower,
        })

        res.status(201).json(newFollow)
    } catch (error) {
        next(error)
    }
})

followRouter.post("/follow/delete", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const { following, follower } = req.body

        const newFollow = await FollowService.deleteFollow({
            following,
            follower,
        })
        console.log("팔로우를 취소하셨습니다.")
        res.status(201).json(newFollow)
    } catch (error) {
        next(error)
    }
})

followRouter.get("/followlist/:userId", async function (req, res, next) {
    try {
        const { userId } = req.params
        const followList = await FollowService.getFollowList({
            userId,
        })
        res.status(200).json(followList)
    } catch (error) {
        next(error)
    }
})

export { followRouter }

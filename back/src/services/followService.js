import { Follow } from "../db"

class FollowService {
    static addFollow = async ({ following, follower }) => {
        const newFollow = { following, follower }
        const createdNewFollow = await Follow.create(newFollow)
        return createdNewFollow
    }

    static getFollowList = async ({ userId }) => {
        const followList = await Follow.getFollowList({ userId })
        console.log(userId)
        return followList
    }

    static deleteFollow = async ({ following, follower }) => {
        const isDataDeleted = await Follow.deleteFollow({ following, follower })

        if (!isDataDeleted) {
            const errorMessage =
                "오류가 발생했습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }
        return { status: "success" }
    }
}

export { FollowService }

import { Like } from "../db"

class LikeService {
    static addLike = async ({ giveLike, getLike }) => {
        const newLike = { giveLike, getLike }
        const createdNewLike = await Like.create(newLike)
        return createdNewLike
    }

    static getLikeList = async ({ getLike }) => {
        const likeList = await Like.getLikeList({ getLike })
        console.log(likeList)
        return likeList
    }

    static deleteLike = async ({ giveLike, getLike }) => {
        const isDataDeleted = await Like.deleteLike({ giveLike, getLike })

        if (!isDataDeleted) {
            const errorMessage =
                "오류가 발생했습니다. 다시 한 번 확인해 주세요."
            return { errorMessage }
        }
        return { status: "success" }
    }
}

export { LikeService }

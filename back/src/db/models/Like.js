import { likeModel } from "../schemas/like.js"

class Like {
  static create = async (newLike) => {
    const gotLike = await likeModel.find({
      giveLike: newLike.giveLike,
      getLike: newLike.getLike,
    })
    console.log(gotLike)
    if (gotLike.length !== 0) {
      const errorMessage = "이미 좋아요를 눌렀습니다"
      return { errorMessage }
    }
    console.log("좋아요를 누르셨습니다.")
    const createdNewLike = await likeModel.create(newLike)
    return createdNewLike
  }

  static getLikeList = async ({ getLike }) => {
    const like = await likeModel.find().where("getLike").equals(getLike)
    const likes = {
      likes: like.length,
      giveLike: like.map((user) => user.giveLike),
    }
    console.log(likes)
    return likes
  }

  static deleteLike = async ({ giveLike, getLike }) => {
    const deleteResult = await likeModel.deleteOne({
      giveLike,
      getLike,
    })
    const isDataDeleted = deleteResult.deletedCount === 1
    return isDataDeleted
  }
}

export { Like }

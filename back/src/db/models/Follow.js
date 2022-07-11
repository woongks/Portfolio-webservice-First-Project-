import { followModel } from "../schemas/follow.js"

class Follow {
  static create = async (newFollow) => {
    const followCheck = await followModel.find({
      following: newFollow.following,
      follower: newFollow.follower,
    })

    if (followCheck.length !== 0) {
      const errorMessage = "이미 팔로우를 하셨습니다"
      return { errorMessage }
    }
    console.log("팔로우를 누르셨습니다.")
    const createdNewFollow = await followModel.create(newFollow)
    return createdNewFollow
  }

  static getFollowList = async ({ userId }) => {
    const following = await followModel.find().where("following").equals(userId)
    const follower = await followModel.find().where("follower").equals(userId)
    const follows = {
      followingNumber: following.length,
      following: following.map((user) => user.follower),
      followerNumber: follower.length,
      follower: follower.map((user) => user.following),
    }
    console.log(follows)
    return follows
  }

  static deleteFollow = async ({ following, follower }) => {
    const deleteResult = await followModel.deleteOne({
      following,
      follower,
    })
    const isDataDeleted = deleteResult.deletedCount === 1
    return isDataDeleted
  }
}

export { Follow }

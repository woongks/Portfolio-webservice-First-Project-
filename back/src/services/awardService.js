import { Award } from "../db"
import { v4 as uuidv4 } from "uuid"

class AwardService {
    static addAward = async ({ userId, title, description }) => {
        const id = uuidv4()
        const newAward = { id, userId, title, description }
        const createdAward = await Award.create(newAward)
        return createdAward
    }

    static getAward = async ({ userId }) => {
        const award = await Award.findById({ userId })

        if (!award) {
            const errorMessage =
                "해당 id로 받은 수상 이력이 없습니다. 다시 한 번 확인해 주세요"
            return { errorMessage }
        }

        return award
    }

    static getAwardList = async ({ userId }) => {
        const awardList = await Award.findByUserId({ userId })
        return awardList
    }

    static updateAward = async ({ userId, title, description }) => {
        let award = await Award.findById({ userId })
        console.log(award)
        if (!award) {
            const errorMessage =
                "해당 id로 받은 수상 이력이 없습니다. 다시 한 번 확인해 주세요"
            return { errorMessage }
        }

        const updateData = { title, description }
        console.log(updateData)

        award = await Award.update(userId, updateData)

        return award
    }

    static deleteAward = async ({ awardId }) => {
        const deletedData = await Award.deleteById({ awardId })

        if (!deletedData) {
            const errorMessage =
                "해당 id로 받은 수상 이력이 없습니다. 다시 한 번 확인해 주세요"
            return { errorMessage }
        }
        return {
            status: "success",
        }
    }
}

export { AwardService }

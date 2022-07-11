import { careerModel } from "../schemas/Career"
class Career {
  static create = async (newCareer) => {
    const createdCareer = await careerModel.create(newCareer)
    return createdCareer
  }

  static findById = async ({ userId }) => {
    const Career = await careerModel.findOne({ id: userId })
    return Career
  }

  static findByUserId = async ({ userId }) => {
    const Careers = await careerModel.find({ userId })
    return Careers
  }

  static update = async (userId, updateData) => {
    const filter = { id: userId }
    const update = updateData
    const option = { returnOriginal: false }

    const updatedCareer = await careerModel.findOneAndUpdate(
      filter,
      update,
      option
    )

    return updatedCareer
  }

  static deleteById = async ({ careerId }) => {
    const deletedData = await careerModel.deleteOne({ id: careerId })
    const isDataDeleted = deletedData.deletedCount === 1
    return isDataDeleted
  }
}

export { Career }

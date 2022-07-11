import { educationModel } from "../schemas/education"

class Education {
  static async create({ newEducation }) {
    console.log("newEducation", newEducation)
    const createdNewEducation = await educationModel.create(newEducation)
    return createdNewEducation
  }

  static async findById({ educationId }) {
    const education = await educationModel.findOne({ id: educationId })
    return education
  }

  static async findByUserID({ userId }) {
    console.log(userId)
    const educationList = await educationModel.find({ userId: userId })
    return educationList
  }

  static async update({ educationId, toUpdate }) {
    const filter = { id: educationId }
    const updatedContent = toUpdate
    const option = { returnOriginal: false }
    const updatedEducation = await educationModel.findOneAndUpdate(
      filter,
      updatedContent,
      option
    )
    return updatedEducation
  }
  static deleteById = async ({ educationId }) => {
    const result = await educationModel.deleteOne({ id: educationId })
    const isDataDeleted = result.deletedCount === 1
    return isDataDeleted
  }
}

export { Education }

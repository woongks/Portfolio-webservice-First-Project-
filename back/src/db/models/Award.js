import { awardModel } from "../schemas/award";
class Award {
  static create = async (newAward) => {
    const createdAward = await awardModel.create(newAward);
    return createdAward;
  };

  static findById = async ({ userId }) => {
    const award = await awardModel.findOne({ id: userId });
    return award;
  };

  static findByUserId = async ({ userId }) => {
    const awards = await awardModel.find({ userId });
    return awards;
  };

  static update = async (userId, updateData) => {
    const filter = { id: userId };
    const update = updateData;
    const option = { returnOriginal: false };

    const updatedAward = await awardModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedAward;
  };

  static deleteById = async ({ awardId }) => {
    const deletedData = await awardModel.deleteOne({ id: awardId });
    const isDataDeleted = deletedData.deletedCount === 1;
    return isDataDeleted;
  };
}

export { Award };

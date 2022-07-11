import { boardModel } from "../schemas/board";

class Board {
  static addBoard = async ({ id, userId, context, title }) => {
    const newBoardData = {
      id,
      userId,
      context,
      title,
    };
    const newBoard = await boardModel.create(newBoardData);
    return newBoard;
  };

  static findById = async ({ boardId }) => {
    const foundBoard = await boardModel.findOne({ id: boardId });
    return foundBoard;
  };

  static deleteBoard = async ({ boardId }) => {
    const deleteBoard = await boardModel.findOneAndDelete({ id: boardId });
    return deleteBoard;
  };

  static findAll = async () => {
    const boards = await boardModel.find({});
    return boards;
  };

  static update = async (boardId, context, title) => {
    const filter = { id: boardId };
    const updateContext = { context, title };
    const option = { returnOriginal: false };
    const updatedData = boardModel.findOneAndUpdate(
      filter,
      updateContext,
      option
    );
    return updatedData;
  };

  static findByUserId = async (userId) => {
    const boards = await boardModel.find({ userId: userId });
    return boards;
  };
}

export { Board };

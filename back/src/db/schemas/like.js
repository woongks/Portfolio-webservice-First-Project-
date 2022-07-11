import { Schema, model } from "mongoose"

const likeSchema = new Schema(
  {
    getLike: {
      type: String,
      required: true,
    },
    giveLike: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const likeModel = model("Like", likeSchema)

export { likeModel }

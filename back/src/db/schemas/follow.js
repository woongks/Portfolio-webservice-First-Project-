import { Schema, model } from "mongoose"

const followSchema = new Schema(
  {
    following: {
      type: String,
      required: true,
    },
    follower: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const followModel = model("Follow", followSchema)

export { followModel }

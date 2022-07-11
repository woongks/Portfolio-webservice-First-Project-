import { Schema, model } from "mongoose"

const boardSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    context: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const boardModel = model("Board", boardSchema)

export { boardModel }

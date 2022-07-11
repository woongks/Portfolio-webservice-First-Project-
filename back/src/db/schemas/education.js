import { Schema, model } from "mongoose"

const educationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const educationModel = model("education", educationSchema)

export { educationModel }

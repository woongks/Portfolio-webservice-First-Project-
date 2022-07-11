import { Schema, model } from "mongoose";

const careerSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const careerModel = model("Career", careerSchema);

export { careerModel };

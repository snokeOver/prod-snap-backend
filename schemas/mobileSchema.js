import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

// the collection name ends with (s)
const MobileModel = mongoose.model("allmobiles", mobileSchema);
export default MobileModel;

import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: String },
    img: {type: String}
}, {timestamps: true})

const Test = mongoose.model("Test", testSchema)

export default Test
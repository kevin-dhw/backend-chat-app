import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: false, maxlength: 10},
    age: {type: Number, require: true, default: 18}
}, {timestamps: true})

const Test = mongoose.model("Test", testSchema)

export default Test
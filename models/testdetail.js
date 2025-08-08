import mongoose from "mongoose";

const testDetail = mongoose.Schema({
    testId: {type: mongoose.Schema.Types.ObjectId, ref: "Test", required:true},
    job: {type: String, required: true},
    img: {type: String, required: false}
}, {timestamps: true})

const TestDetail = mongoose.model('TestDetail', testDetail)

export default TestDetail
import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    answer: {
        type: Number,
        required: true
    }
})

export const Question = mongoose.model("Question", questionSchema);
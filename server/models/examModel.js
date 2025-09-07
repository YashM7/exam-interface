import mongoose from "mongoose";

const examSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questions: [
        {
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
            },
            userAnswer: {
                type: Number
            }
        }
    ],
    startTime: {
        type: Date,
        default: Date.now
    },
    expiryTime: {
        type: Date,
        required: true
    },
    submitted: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        default: 0
    }
})

export const Exam = mongoose.model("Exam", examSchema);
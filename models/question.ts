import * as mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers : [{ type: String, required: true }],
    rightAnswer: { type: Number, required: true},
    category: {type: String, required: true}
})

const QuestionModel = mongoose.model('Question', questionSchema);

export { QuestionModel }
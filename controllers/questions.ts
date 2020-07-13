import { Request, Response } from 'express';
import { QuestionModel } from '../models/question';
import { CreateQuestion } from '../logic/createQuestion';
import { SettingsDataModel } from '../models/settingsData';
import { TestCheck } from '../logic/testCheck';

export class QuestionsController {

    static async getTestQuestion(req: Request, res: Response) {
        try{
            const questions = await QuestionModel.find()
            // console.log(questions.length);
            if(questions.length !== 0) {
                const settings = await SettingsDataModel.findOne()
                //////// main method to create test questions array /////////////
                const testQuestions = CreateQuestion.questionMakerNew(questions, settings);
                //////////////////////////////////////////////////////////////////
                /////////////// random questions without cat sort ////////////////
                // const testQuestions = CreateQuestion.questionMakerWithoutCats(questions, questions.length-1, 5)
                /////////////////////////////////////////////////////////////////
                res.status(200).json({message: 'it is ok', testQuestions});
            }else {
                res.status(200).json({message: 'no data', testQuestions: questions});
            }
        }
        catch{(e) => console.log(e)}
    }
    
    static async getAllQuestion(req: Request, res: Response) {
        try{
            const questions = await QuestionModel.find()
            res.status(200).json(questions)
        }
        catch{(e) => console.log(e)}
    }


    static async addQuestion(req: Request, res: Response) {
        // console.log(req.body);
        const question = await new QuestionModel({
            question: req.body.question,
            answers: req.body.answers,
            rightAnswer: req.body.rightAnswer,
            category: req.body.category
        })
        try{
            await question.save()
            res.status(201).json({message: 'question added', question})
            }
        catch{(e) => {
            console.log(e)
        }}    
    }

    static async removeQuestion(req: Request, res: Response) {
        // console.log(req.params.id)
        try{
            await QuestionModel.deleteOne({_id: req.params.id});
            res.json({message: 'question removed'});
        }catch{(e) => console.log(e)}
    }

    static async updateQuestion(req: Request, res: Response) {
        const question = await new QuestionModel({
            question: req.body.question,
            answers: req.body.answers,
            rightAnswer: req.body.rightAnswer,
            category: req.body.category,
            _id: req.body._id
        })
        try{
            await QuestionModel.updateOne({_id: req.params.id}, question)
            res.status(200).json({message: 'update successfull'})
        }catch{(e)=> console.log(e)}
    }

    static async checkResult(req: Request, res: Response) {
        const answers =  req.body;
        const questionsNumber = answers.length;
        const questions = [];
        for(let i=0; i<questionsNumber; i++) {
            const question = await QuestionModel.findById({_id: answers[i].questionId})
            questions.push(question);
        }
        const resultOfChecking = TestCheck.checking(answers, questions);
        // console.log(resultOfChecking);
        res.status(201).json(resultOfChecking);
    }
}
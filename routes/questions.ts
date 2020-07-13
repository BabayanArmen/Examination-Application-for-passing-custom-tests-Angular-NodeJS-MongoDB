import * as express from 'express'
import { QuestionsController } from '../controllers/questions'

const questionRouter = express.Router()

//localhost:3000/api/questions
questionRouter.post('', QuestionsController.addQuestion)

//localhost:3000/api/questions/testquestions
questionRouter.get('/testquestions', QuestionsController.getTestQuestion)

//localhost:3000/api/questions/allquestion
questionRouter.get('/', QuestionsController.getAllQuestion)

//localhost:3000/api/questions/:id
questionRouter.delete('/:id', QuestionsController.removeQuestion)

//localhost:3000/api/questions/:id
questionRouter.put('/:id', QuestionsController.updateQuestion)

//localhost:3000/api/qustions/check
questionRouter.post('/check', QuestionsController.checkResult)

export { questionRouter }
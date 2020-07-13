export class TestCheck {

    static checking(answers, questions) {
        let checkResult = [];

        for(let i=0; i<questions.length; i++) {
            const rightAnswer = questions[i].rightAnswer;
            const userAnswer = answers[i].answer;
            
            if(rightAnswer === userAnswer) {
                const obj = {
                    id: answers[i].questionIndex,
                    result: true,
                    rightAnswer
                }
                checkResult.push(obj);
            } else {
                const obj = {
                    id: answers[i].questionIndex,
                    result: false,
                    rightAnswer
                }
                checkResult.push(obj);
            }
        }
        return checkResult;
    }
}
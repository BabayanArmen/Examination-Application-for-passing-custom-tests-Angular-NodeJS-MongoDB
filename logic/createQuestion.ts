export class CreateQuestion {

    // static rundom(max) {
    //     let indexes = []
    //     do{
    //     let rundomNum = Math.round(Math.random() * (max - 0) ) + 0;
    //     let res = indexes.find(el => el === rundomNum);
    //     if(!res) { indexes.push(rundomNum) }
    //     }while(indexes.length<3)
    //     return indexes;
    //     const diff = max - 0; 
    //     return Math.round(Math.random() * diff ) + 0;
    // }

    ////////// just random questions without sorting by categories //////
    static questionMakerWithoutCats(array, max, numOfQuestions) {
        let res = [];
        let indexes = []
        do{
            let rundomNum = Math.round(Math.random() * (max - 0) ) + 0;
            let res = indexes.find(el => el === rundomNum);
            if(!res) { indexes.push(rundomNum) }
        }while(indexes.length<numOfQuestions)

        for(let i=0; i<indexes.length; i++){
            res.push(array[indexes[i]])
        };
        return res;
    }
    ///////////////////////////////////////////////////////////////////

    /////////// main method to create test questions array ///////////
    static questionMakerNew(questionsArray, settings) {
        let questions = questionsArray;
        let categories = settings.categories;
        let max = questions.length-1
        let result = [];
        let rundomIndexes = [];
        let num: Number;

        for(let i = 0; i< categories.length; i++) {

            const isQuestionPerCat = questions.find(el => el.category === categories[i].category);
            const availableNumOfQuestions = questions.filter(el => el.category === categories[i].category);
            if(isQuestionPerCat && (categories[i].numOfQuestions > 0)){
                // console.log(isQuestionPerCat);
                // console.log(availableNumOfQuestions.length);
                // console.log(categories[i].numOfQuestions);
                (availableNumOfQuestions.length >= categories[i].numOfQuestions)? num = categories[i].numOfQuestions : num = availableNumOfQuestions.length;
                let j = 0;
                do{
                    let rundomNum = Math.round(Math.random() * (max - 0) ) + 0;
                    if(rundomIndexes.length === 0 && questions[rundomNum].category === categories[i].category){
                        rundomIndexes.push(rundomNum);
                        result.push(questions[rundomNum]);
                        j++;
                    } 
                    else {
                        let ind = rundomIndexes.find(el => el === rundomNum);
                        if(!ind && questions[rundomNum].category === categories[i].category) {
                            rundomIndexes.push(rundomNum);
                            result.push(questions[rundomNum]);
                            j++;
                        }
                    } 
                }while(j<num);  
            }else {
                console.log(`no questions for ${categories[i].category} category`)
                continue;
            }
        }
        for(let i=0; i<result.length; i++) {
            result[i].rightAnswer = null;
        } 
        return result;
    }
    ////////////////////////////////////////////////////////////////////////////
     
} 
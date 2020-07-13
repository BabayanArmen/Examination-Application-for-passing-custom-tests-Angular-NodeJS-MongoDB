import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { Question, TestResult, SettingsData, CheckResult } from '../../shared/classes/interfaces';
import { Subscription } from 'rxjs';
import { FooterRowOutlet } from '@angular/cdk/table';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.scss']
})
export class ExamPageComponent implements OnInit, OnDestroy {
  settingsSub: Subscription;
  form: FormGroup;
  questions: Question [];
  email: string;
  phone: number;
  startButtonToggle: boolean = false
  testToggle: boolean = false;
  resultToggle: boolean = false;
  ansCount: number = 0;
  minutes: number;
  seconds: number;
  timer: any;

  red: boolean = false;
  green: boolean = false;

  resColors = [];
  res: TestResult [] = [];

  input0Checked: boolean = false;
  input1Checked: boolean = false;
  input2Checked: boolean = false;

  answers: any[] = [];
  newRes: any[] = [];
  newResColors: any[] = [];
  checkingResult: CheckResult[] = [];



  @ViewChildren('test') elementRef: QueryList<ElementRef>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    ///////// getting time from db //////////
    this.dataService.getSettings();
    this.settingsSub = this.dataService.getSettingsObservable()
      .subscribe((data: SettingsData) => {
        // console.log(data)
        this.minutes = data.timerTime.minutes;
        this.seconds = data.timerTime.seconds;
      })
    //////////////////////////////////////////
    this.dataService.getTestQuestions()
      .subscribe((data) => {
        (data.testQuestions.length === 0)? alert('no questions'): '';
        this.questions = data.testQuestions;
        // console.log(this.questions);
      })
    // this.res = this.x.testResult;
    // this.minutes = this.dataService.getTimeForTimer().minutes;
    // this.seconds = this.dataService.getTimeForTimer().seconds;
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
  });
  }

  ngAfterViewInit() {}

  start() {
    // console.log(this.elementRef)  // console.log our test html element
    this.startButtonToggle = true;
    this.testToggle = true;
    this.form.get('email').disable();
    this.form.get('phone').disable();

    this.timer = setInterval(()=> {
      if(this.seconds>0) {
          this.seconds--;
          //console.log(this.seconds);
      } else if(this.minutes>0){
          this.seconds=60;
          this.minutes--;
      } else { return this.finish(); }
    },1000)
  }
///////////////////////////////////// input check /////////////////////////////////////
check(event, rightAnswer, i, question, inputIndex, id) {
  var index = this.questions[i].answers.indexOf(event.value); // տվյալ պատասխանի ինդեքսն է testQuestions array-ի answers array-ում

  this.input0Checked = false;
  this.input1Checked = false;
  this.input2Checked = false;
  // console.log(event)
  switch (inputIndex) {
    case 0: {
      this.input0Checked = true;
      break;}
    case 1: {
      this.input1Checked = true;
      break;}
    case 2: {
      this.input2Checked = true;
      break;}
    }

    // console.log('input 0 is checked ' + this.input0Checked);
    // console.log('input 1 is checked ' + this.input1Checked);
    // console.log('input 2 is checked ' + this.input2Checked);
////// input 0 /////
  if(this.input0Checked) {

    /////////////////////////
    this.answers.push({
      questionId: id,
      answer: event.value-1,
      questionIndex: i
    })

    // this.newRes[i] = {
    //   question: question,
    //   answer: event.value,
    //   rightAnswer: null
    // };

    this.newResColors[i] = {
      i: i,
      spanIndex: 0,
      value: null,
      answerRes: null,
      rightanswer: null,
    }
    ///////////////////////////

    // if(index == rightAnswer){

    //     this.res[i] = {
    //         email: this.form.controls.email.value,
    //         phone: this.form.controls.phone.value,
    //         question: question,
    //         answer: event.value,
    //         rightAnswer: 'Your Answer is right'
    //       };

    //    this.ansCount++;

    //    this.resColors[i] = {
    //         i: i,
    //         spanIndex: 0,
    //         value: 'green',
    //         answerRes: true,
    //         rightanswer: rightAnswer
    //     }
    //     } else {

    //       this.res[i] = {
    //         email: this.form.controls.email.value,
    //         phone: this.form.controls.phone.value,
    //         question: question,
    //         answer: event.value,
    //         rightAnswer: 'Your Answer is wrong, right answer is : ' + this.questions[i].answers[this.questions[i].rightAnswer]
    //       };

    //       this.resColors[i] = {
    //         i: i,
    //         spanIndex: 0,
    //         value: 'red',
    //         answerRes: false,
    //         rightanswer: rightAnswer
    //       }
    //     }
  };

////// input 1 /////
  if(this.input1Checked) {

    ///////////////////////////////////
    this.answers.push({
      questionId: id,
      answer: event.value-1,
      questionIndex: i
    })

    // this.newRes[i] = {
    //   question: question,
    //   answer: event.value,
    //   rightAnswer: null
    // };

    this.newResColors[i] = {
      i: i,
      spanIndex: 3,
      value: null,
      answerRes: null,
      rightanswer: null,
    }
    ////////////////////////////////////

    // if(index == rightAnswer){

    //   this.res[i] = {
    //     email: this.form.controls.email.value,
    //     phone: this.form.controls.phone.value,
    //     question: question,
    //     answer: event.value,
    //     rightAnswer: 'Your Answer is right'
    //   };

    //   this.ansCount++;

    //       this.resColors[i] = {
    //         i: i,
    //         spanIndex: 3,
    //         value: 'green',
    //         answerRes: true,
    //         rightanswer: rightAnswer
    //       }

    //   } else {

    //     this.res[i] = {
    //       email: this.form.controls.email.value,
    //       phone: this.form.controls.phone.value,
    //       question: question,
    //       answer: event.value,
    //       rightAnswer: 'Your Answer is wrong, right answer is : ' + this.questions[i].answers[this.questions[i].rightAnswer]
    //     };

    //     this.resColors[i] = {
    //         i: i,
    //         spanIndex: 3,
    //         value: 'red',
    //         answerRes: false,
    //         rightanswer: rightAnswer
    //       }
    //     }
  };

////// input 2 /////
  if(this.input2Checked) {

    //////////////////////////////////
    this.answers.push({
      questionId: id,
      answer: event.value-1,
      questionIndex: i
    })

    // this.newRes[i] = {
    //   question: question,
    //   answer: event.value,
    //   rightAnswer: null
    // };

    this.newResColors[i] = {
      i: i,
      spanIndex: 6,
      value: null,
      answerRes: null,
      rightanswer: null,
    }
    ///////////////////////////////////////

    //   if(index == rightAnswer){

    //   this.res[i] = {
    //     email: this.form.controls.email.value,
    //     phone: this.form.controls.phone.value,
    //     question: question,
    //     answer: event.value,
    //     rightAnswer: 'Your Answer is right'
    //   };

    //   this.ansCount++;

    //   this.resColors[i] = {
    //       i: i,
    //       spanIndex: 6,
    //       value: 'green',
    //       answerRes: true,
    //       rightanswer: rightAnswer
    //   }
    //   }else {

    //     this.res[i] = {
    //       email: this.form.controls.email.value,
    //       phone: this.form.controls.phone.value,
    //       question: question,
    //       answer: event.value,
    //       rightAnswer: 'Your Answer is wrong, right answer is : ' + this.questions[i].answers[this.questions[i].rightAnswer]
    //     };

    //   this.resColors[i] = {
    //       i: i,
    //       spanIndex: 6,
    //       value: 'red',
    //       answerRes: false,
    //       rightanswer: rightAnswer
    //   }
    // }
  }

}

  finish() {
    // this.form.get('email').disable();
    // this.form.get('phone').disable();
    this.resultToggle = true;
    clearInterval(this.timer);

    //////////////////////// Checking In Backend //////////////////
    console.log(this.answers)
    this.dataService.testChecking(this.answers)
      .subscribe((data: CheckResult[]) => {
        console.log(data)
        this.checkingResult = data;

        for(let i=0; i<this.checkingResult.length; i++) {
          const resIndex = this.checkingResult[i].id;
          if(this.checkingResult[i].result){
            this.newResColors[resIndex].value = 'green'
            this.newResColors[resIndex].answerRes = true
            this.newResColors[resIndex].rightanswer = this.checkingResult[i].rightAnswer
          }else {
            if(this.checkingResult[i].result === false)
            this.newResColors[resIndex].value = 'red'
            this.newResColors[resIndex].answerRes = false
            this.newResColors[resIndex].rightanswer = this.checkingResult[i].rightAnswer
          }
        }
        console.log(this.newResColors);


            /////////////// changing inputs colors, showing right answers with green color too //////////
            for(let j = 0; j<this.questions.length; j++){
              if(this.newResColors[j] !== undefined ) {
                if(this.newResColors[j].answerRes) {
                  let i = this.newResColors[j].i;
                  let spanIndex = this.newResColors[j].spanIndex;
                  let color = this.newResColors[j].value;
                  this.elementRef["_results"][i].nativeElement.children[1].children[spanIndex].children[0].children[1].style.color = color;
                } else {

                  let i = this.newResColors[j].i;
                  let spanIndex = this.newResColors[j].spanIndex;
                  let color = this.newResColors[j].value;
                  this.elementRef["_results"][i].nativeElement.children[1].children[spanIndex].children[0].children[1].style.color = color;

                  switch (this.newResColors[j].rightanswer) {
                    case 0: {let i = this.newResColors[j].i;
                            let spanIndex = 0;
                            let color = 'green';
                            this.elementRef["_results"][i].nativeElement.children[1].children[spanIndex].children[0].children[1].style.color = color;
                            break;}
                    case 1: {let i = this.newResColors[j].i;
                            let spanIndex = 3;
                            let color = 'green';
                            this.elementRef["_results"][i].nativeElement.children[1].children[spanIndex].children[0].children[1].style.color = color;
                            break;}
                    case 2: {let i = this.newResColors[j].i;
                            let spanIndex = 6;
                            let color = 'green';
                            this.elementRef["_results"][i].nativeElement.children[1].children[spanIndex].children[0].children[1].style.color = color;
                            break;}
                  };
                }
              }
            }
            //////////////////////////////////////////////////////////////////////////////////////////
      });
    ///////////////////////////////////////////

    // /////////////// checking for missed quiestions //////////////////
    // for(let j = 0; j<this.questions.length; j++){
    //   if(this.res[j] === undefined){
    //       this.res[j] = {
    //         email: this.form.controls.email.value,
    //         phone: this.form.controls.phone.value,
    //         question: this.questions[j].question,
    //         answer: 'no answer',
    //         // rightAnswer: 'Right answer is ' + this.questions[j].answers[(this.questions[j].rightAnswer)]
    //         rightAnswer: ''
    //     };
    //   }
    // }
    // //////////////////////////////////////////////////////////////////

    // console.log(this.res);
    // console.log(this.resColors);
    // this.dataService.sendResult(this.res);
  }

  testAgain() {
    this.startButtonToggle = true;
    this.testToggle = false;
    this.resultToggle = false;
    this.ansCount = 0;
//////// getting time again from dataService from DB
    this.dataService.getSettings();
    this.settingsSub = this.dataService.getSettingsObservable()
    .subscribe((data: SettingsData) => {
      this.minutes = data.timerTime.minutes;
      this.seconds = data.timerTime.seconds;
    })
////////////////////////////////////////////////////
    this.form.get('email').reset();
    this.form.get('phone').reset();
    this.form.get('email').enable();
    this.form.get('phone').enable();
    this.res = [];
    this.dataService.getTestQuestions()
      .subscribe((data) => {
        (data.testQuestions.length === 0)? alert('no questions'): '';
        this.questions = data.testQuestions;
        // console.log(this.questions);
      })
  }

  ngOnDestroy(): void {
  this.settingsSub.unsubscribe();
  }

}

import { TestResult, Question, SettingsData, CheckResult } from '../classes/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private testResult: TestResult [] = [];
  private questionsObservable = new Subject<Question[]>();
  private settingsObservable = new Subject<SettingsData>();
  private noCategoryObservable = new Subject<boolean>();
  private questions: Question[];
  settingsObjectID: string;
  settings: SettingsData;

  constructor(private http: HttpClient) { }

  sendResult(obj: TestResult []) {
    // http ...a
    console.log(obj)
  }

  /////////////// user methods //////////////////////
  getTestQuestions() {
    return this.http.get<{message: string, testQuestions: Question []}>('http://localhost:3000/api/questions/testquestions')
  }

  getSettings() {
    this.http.get<{haveSettings: boolean, settings: SettingsData}>('http://localhost:3000/api/settings')
      .subscribe((data) => {
        if(data.haveSettings) {
          this.settings = data.settings;
          // console.log(this.settings)
          this.settingsObservable.next(this.settings)
          this.settingsObjectID = data.settings._id;
          (data.settings.categories.length < 1)? this.noCategoryObservable.next(true) : this.noCategoryObservable.next(false);
        }else{
          this.noCategoryObservable.next(true);
        }
      })
  }


  //////////////////  admin methods //////////////////
  addQuestion(question, answer1, answer2, answer3, rightAnswer, category) {
    const obj: Question = {
      question,
      answers: [answer1, answer2, answer3],
      rightAnswer,
      category,
      _id: null
    }
    this.http.post<{message: string, question: Question}>('http://localhost:3000/api/questions', obj)
      .subscribe((data) => {
        // console.log(data.question)
        this.questions.push(data.question);
        this.questionsObservable.next(this.questions);
      })
  }

  getAllQuestions() {
    this.http.get('http://localhost:3000/api/questions')
    .subscribe((data: Question[]) => {
      this.questions = data;
      this.questionsObservable.next(this.questions)
    })
  }

  removeQuestion(id) {
    this.http.delete(`http://localhost:3000/api/questions/${id}`)
      .subscribe((data) => {
        this.questions = this.questions.filter(el => el._id !== id)
        this.questionsObservable.next(this.questions);
      })
  }

  updateQuestion(question,answer1,answer2,answer3,rightAnswer,category, id, index) {
    const obj: Question = {
      question,
      answers: [answer1, answer2, answer3],
      rightAnswer,
      category,
      _id: id
    }
    this.http.put<{message: string}>(`http://localhost:3000/api/questions/${id}`, obj)
      .subscribe((data) => {
        console.log(data.message)
        this.questions[index] = obj;
        this.questionsObservable.next(this.questions)
      })
  }

  getQuestionsObservable() {
    return this.questionsObservable.asObservable();
  }

  getSettingsObservable() {
    return this.settingsObservable.asObservable();
  }

  getNoCategoryObservable() {
    return this.noCategoryObservable.asObservable();
  }

  resetSettings() {
    const obj = [];
    return this.http.post('http://localhost:3000/api/settings/reset', obj)
    .subscribe(data => {
      console.log(data);
      const settingsReset: SettingsData = {
          timerTime: {minutes: 0, seconds: 0},
          categories: [{ category: 'no category', numOfQuestions: 0}]
      }
      this.settings = settingsReset;
      this.settingsObservable.next(this.settings);
      this.noCategoryObservable.next(true);
    })
  }

  addNewCategory(newCategory) {
    // console.log(newCategory);
    const newCat = {newCategory}
    this.http.put(`http://localhost:3000/api/settings/category/${this.settingsObjectID}`, newCat)
    .subscribe(data => {
      // console.log(data)
      this.getSettings();
    });
  }

  addNumForCat(obj) {
    // console.log(obj)
    this.http.put(`http://localhost:3000/api/settings/numforcat/${this.settingsObjectID}`, obj)
    .subscribe(data => {
      // console.log(data);
      this.getSettings();
    });
  }

  removeCategory(removeCategory) {
    // console.log(removeCategory);
    const obj = {category: removeCategory};
    this.http.put(`http://localhost:3000/api/settings/removecat/${this.settingsObjectID}`, obj)
    .subscribe(data => {
      // console.log(data);
      this.getSettings();
    });
  }

  addTimerTime(obj) {
    // console.log(obj);
    this.http.put(`http://localhost:3000/api/settings/timer/${this.settingsObjectID}`, obj)
      .subscribe((data) => {
        // console.log(data);
        this.getSettings();
      });
  }

  testChecking(obj) {
    return this.http.post<CheckResult[]>('http://localhost:3000/api/questions/check', obj)
  }



}

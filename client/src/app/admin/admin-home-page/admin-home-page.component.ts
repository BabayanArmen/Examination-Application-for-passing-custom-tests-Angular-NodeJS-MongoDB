import { SettingsData, Question, QuestionsPerCat } from './../../shared/classes/interfaces';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss']
})
export class AdminHomePageComponent implements OnInit, OnDestroy {
  settingsSub: Subscription;
  noCategorySub: Subscription;
  panelOpenState = false;
  dropDownToggle1 = false;
  dropDownToggle2 = false;
  noCategoryToggle: boolean = false;
  timerTimeToggle = false;

  categories = [];
  timerTime: {minutes: number, seconds: number};
  questions: Question[];
  questionSub: Subscription;
  questionsPerCat: QuestionsPerCat[] = [];

  ////////////////// data tabel ////////////////////////////
  displayedColumns: string[] = ['position', 'category', 'numOfQuestions', 'numOfQuestionsInTest', 'addNum', 'remove'];
  dataSource: MatTableDataSource<QuestionsPerCat>;
  /////////////////////////////////////////////////////////

  constructor( private dataService: DataService ) { }

  ngOnInit(): void {
    this.dataService.getSettings();
    this.settingsSub = this.dataService.getSettingsObservable()
      .subscribe((data: SettingsData) => {
        // console.log(data);
        this.categories = data.categories;
        // console.log(this.categories)
        this.timerTime = data.timerTime;
        this.timerTimeToggle = true;

        this.dataService.getAllQuestions();
        this.questionSub = this.dataService.getQuestionsObservable()
        .subscribe((data: Question[]) => {
          this.questions = data
          this.dataTabel();
          // console.log(this.questionsPerCat);
          this.dataSource = new MatTableDataSource<QuestionsPerCat>(this.questionsPerCat)
        });

      });
    this.noCategorySub = this.dataService.getNoCategoryObservable()
      .subscribe((data: boolean) => {
        this.noCategoryToggle = data;
      });

    }

  minutes = new FormControl('', [Validators.required]);
  seconds = new FormControl('', [Validators.required]);
  numOfQuestions = new FormControl('' , [Validators.required]);
  choosenCategory = new FormControl('' , [Validators.required]);
  category = new FormControl('' , [Validators.required]);
  removeCategory = new FormControl('' , [Validators.required]);


  onReset() {
    if(confirm('are you sure?')){
      this.dataService.resetSettings()
    }
  }

  onNewCategory() {
    this.noCategoryToggle = false;
    const newCategory = this.category.value;
    this.dataService.addNewCategory(newCategory);
    this.category.reset();

  }

  onNumOfCat() {
    const NumOfQuestionsForCategory = {category:this.choosenCategory.value, numOfQuestions:this.numOfQuestions.value};
    // console.log(NumOfQuestionsForCategory);
    this.dataService.addNumForCat(NumOfQuestionsForCategory);
    this.numOfQuestions.reset();
  }

  onNumOfCat2(category) {
    // console.log(this.numOfQuestions.value);
    if(this.numOfQuestions.value !== null && this.numOfQuestions.value >= 0){
      const NumOfQuestionsForCategory = {category:category, numOfQuestions:this.numOfQuestions.value};
      this.dataService.addNumForCat(NumOfQuestionsForCategory);
      this.numOfQuestions.reset();
      }
  }

  onRemoveCategory() {
    if(confirm('are you sure?')){
    console.log(this.removeCategory.value)
    this.dataService.removeCategory(this.removeCategory.value);
    }
  }

  onRemoveCategoryFromTabel(category) {
    if(confirm('are you sure?')){
    // console.log(category)
    this.dataService.removeCategory(category);
    }
  }

  onTimerTime() {
    const obj = {
      minutes: this.minutes.value,
      seconds: this.seconds.value
    };
    this.dataService.addTimerTime(obj);
    this.minutes.reset();
    this.seconds.reset();
  }

  dataTabel() {
    this.questionsPerCat = [];
    this.categories.map((el) => {
      const res = this.questions.filter(el2 => el2.category === el.category);
      this.questionsPerCat.push({
        position: this.categories.indexOf(el),
        category: el.category,
        numOfQuestions: res.length,
        numOfQuestionsInTest: el.numOfQuestions
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
    this.noCategorySub.unsubscribe();
    this.questionSub.unsubscribe();
  }

}

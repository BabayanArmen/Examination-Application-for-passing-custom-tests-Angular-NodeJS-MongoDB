import { DataService } from './../../shared/services/data.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question, SettingsData } from 'src/app/shared/classes/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss']
})
export class UpdatePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  id: string;
  index: number;

  settingsSub: Subscription;
  categories = [];

  constructor(  @Inject(MAT_DIALOG_DATA) private data: any,
                private dataService: DataService  ) { }

  ngOnInit(): void {
    // console.log(this.data)
    // console.log(this.data.obj._id)
    this.id = this.data.obj._id;
    this.index= this.data.index;
    this.form =  new FormGroup({
      question: new FormControl(this.data.obj.question, [Validators.required]),
      answer1: new FormControl(this.data.obj.answers[0], [Validators.required]),
      answer2: new FormControl(this.data.obj.answers[1], [Validators.required]),
      answer3: new FormControl(this.data.obj.answers[2], [Validators.required]),
      rightAnswer: new FormControl(this.data.obj.rightAnswer.toString(), [Validators.required]),
      category: new FormControl(this.data.obj.category, [Validators.required]),
    })

    this.dataService.getSettings();
    this.settingsSub = this.dataService.getSettingsObservable()
      .subscribe((data: SettingsData) => {
        this.categories = data.categories;
      })
  }

  onUpdateQuiestion() {
    console.log(this.form.value)
    const question = this.form.value.question;
    const answer1 = this.form.value.answer1;
    const answer2 = this.form.value.answer2;
    const answer3 = this.form.value.answer3;
    const rightAnswer = this.form.value.rightAnswer;
    const category = this.form.value.category;
    this.dataService.updateQuestion(question,answer1,answer2,answer3,rightAnswer,category, this.id, this.index);
  }

  ngOnDestroy(): void {
    this.settingsSub.unsubscribe();
  }

}

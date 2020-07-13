import { DataService } from './../../shared/services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsData } from 'src/app/shared/classes/interfaces';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit, OnDestroy {
  form: FormGroup;
  settingsSub: Subscription;
  categories = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    ////////// getting settings from dataService from db //////
    this.dataService.getSettings();
    this.settingsSub = this.dataService.getSettingsObservable()
      .subscribe((data: SettingsData) => {
        this.categories = data.categories;
        // console.log(this.categories);
      })
    ///////////////////////////////////////////////////////////
    this.form =  new FormGroup({
      question: new FormControl('', [Validators.required]),
      answer1: new FormControl('', [Validators.required]),
      answer2: new FormControl('', [Validators.required]),
      answer3: new FormControl('', [Validators.required]),
      rightAnswer: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    })
  }

  addQuiestion() {
    // console.log('add question')
    const question = this.form.get('question').value;
    const asnwer1 = this.form.get('answer1').value;
    const asnwer2 = this.form.get('answer2').value;
    const asnwer3 = this.form.get('answer3').value;
    const rightAnswer = (this.form.get('rightAnswer').value)*1;
    const category = this.form.get('category').value;
    this.dataService.addQuestion(question, asnwer1, asnwer2, asnwer3, rightAnswer, category);
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.settingsSub.unsubscribe();
  }

}

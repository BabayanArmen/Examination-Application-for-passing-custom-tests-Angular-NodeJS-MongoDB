import { DataService } from './../../shared/services/data.service';
import { DialogContentComponent } from './../dialog-content/dialog-content.component';
import { Component, OnInit, ViewChildren, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Question } from 'src/app/shared/classes/interfaces';
import { Subscription } from 'rxjs';
import { UpdatePageComponent } from '../update-page/update-page.component';


@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class QuestionsPageComponent implements OnInit, OnDestroy {
  questions: Question [];
  questionSub: Subscription;
  p: number = 1;  // for pagination


  constructor(  public dialog: MatDialog,
                private dataService: DataService  ) { }

  ngOnInit(): void {
    this.dataService.getAllQuestions();
    this.questionSub = this.dataService.getQuestionsObservable()
    .subscribe((data: Question[]) => this.questions = data);
  }

  openDialogADD() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '100%'
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  openDialogUPDATE(obj, index) {
      const dialogRef = this.dialog.open(UpdatePageComponent, {
        width: '100%',
        data: {obj, index}
    });

  }

  onDelete(ind) {
    // const answer = confirm('are you sure?')
    if(confirm('are you sure?')) {   // confirm it's a pop up buildin dialog window
      const id = this.questions[ind]._id
      this.dataService.removeQuestion(id)
    }

  }


  ngOnDestroy() {
    this.questionSub.unsubscribe();
  }



}


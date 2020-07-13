import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MaterialModule } from '../material/material.module';
import { QuestionsPageComponent } from './questions-page/questions-page.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdatePageComponent } from './update-page/update-page.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
// import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';



@NgModule({
  declarations: [AdminPageComponent, QuestionsPageComponent, DialogContentComponent, UpdatePageComponent, AdminHomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminPageComponent, children: [
        {path: 'home', component: AdminHomePageComponent},
        {path: 'questions', component: QuestionsPageComponent}
      ]},
    ]),
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class AdminModule { }

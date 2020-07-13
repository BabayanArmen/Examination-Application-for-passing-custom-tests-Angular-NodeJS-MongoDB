import { AdminModule } from './admin/admin.module';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { UserLayoutComponent } from './shared/layouts/user-layout/user-layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { ExamPageComponent } from './pages/exam-page/exam-page.component';
import { UserGuard } from './shared/classes/user.guard';
import { AdminGuard } from './shared/classes/admin.guard';


const routes: Routes = [

  {path: '', component: AuthLayoutComponent, children: [
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: '***', redirectTo: '/', pathMatch: 'full'}
  ]},

  {path: '', component: UserLayoutComponent, canActivate: [UserGuard], children: [
    {path: 'home', component: UserHomePageComponent},
    {path: 'exam', component: ExamPageComponent},
    {path: 'result', component: ResultPageComponent},
    {path: '***', redirectTo: '/', pathMatch: 'full'}
  ]},

  // admin module using lazy loading
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard]},

  {path: '***', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

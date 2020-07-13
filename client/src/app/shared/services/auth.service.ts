import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserAuthenticated: boolean = false;
  private isAdminAuthenticated: boolean = false;

  constructor(private router: Router) { }


  login(email: string, password: string) {
    if(email === 'a@a.a'){
      this.isAdminAuthenticated = true;
      this.router.navigate(['/admin/home'])
    } else {
      this.isUserAuthenticated = true;
      this.router.navigate(['/home'])
    }
  }

  logout() {
    this.router.navigate(['/'])
  }

  getIsUserAuth() {
    return this.isUserAuthenticated;
  }

  getIsAdminAuth() {
    return this.isAdminAuthenticated
  }

}

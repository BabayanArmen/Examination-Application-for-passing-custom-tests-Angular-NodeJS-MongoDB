import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/classes/validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  hide = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,
                                  // Validators.minLength(3),
                                  // Validators.pattern(/[A-Z]/), // this is checking if password have at least on uppercase letter
                                  // CustomValidators.doNotAllowed(/@/),
                                  // CustomValidators.mustContain(/A/),
                                  // CustomValidators.firstSymbolCanNotBe(/#/),
                                  // CustomValidators.firstSymbolMustBe(/W/),
                                  // CustomValidators.lastSymbolCanNotBe(/o/),
                                  // CustomValidators.lastSymbolMustBe(/y/),
                                  // CustomValidators.mustHaveUppercase(),
                                  // CustomValidators.mustHaveLowercase(),
                                  // CustomValidators.mustHaveNumber(),
                                  // CustomValidators.canNotHaveNumber(),
                                  // CustomValidators.mustHaveLetter()
                                ]);


  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'Email is required';
  //   }

  //   if (this.password.hasError('required')) {
  //     return 'Password is required';
  //   }

  //   if (this.password.hasError('minlength')) {
  //     return "minimum 3 symbols"

  //   }

  //   if (this.password.hasError('doNotAllowed')) {
  //     return "password can't contain @"
  //   }

  //   if (this.password.hasError('mustContain')) {
  //     return "password must contain A "
  //   }

  //   if (this.password.hasError('firstSymbolCanNotBe')) {
  //     return "first symbol can't be #"
  //   }

  //   if (this.password.hasError('firstSymbolMustBe')) {
  //     return "first symbol must be W"
  //   }

  //   if (this.password.hasError('lastSymbolCanNotBe')) {
  //     return "last symbol can't be o"
  //   }

  //   if (this.password.hasError('lastSymbolMustBe')) {
  //     // console.log(this.password.errors)
  //     return "last symbol must be " + this.password.errors.lastSymbolMustBe.value.source
  //   }

  //   if (this.password.hasError('mustHaveUppercase')) {
  //     return "password must have at least one uppercase letter"
  //   }

  //   if (this.password.hasError('mustHaveLowercase')) {
  //     return "password must have at least one lowercase letter"
  //   }

  //   if (this.password.hasError('mustHaveLetter')) {
  //     return "password must have at least one letter"
  //   }

  //   if (this.password.hasError('mustHaveNumber')) {
  //     return "password must have at least one number"
  //   }

  //   if (this.password.hasError('canNotHaveNumber')) {
  //     return "password can't have any number"
  //   }

  //   if (this.password.hasError('pattern')) {
  //     return "password must have at least one uppercase letter"
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  onLogin() {
    // console.log(this.email.value + ' ' + this.password.value);
    this.authService.login(this.email.value, this.password.value);
    this.email.reset();
    this.password.reset();
  }

}

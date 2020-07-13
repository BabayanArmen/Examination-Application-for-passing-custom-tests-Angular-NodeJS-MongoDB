import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/classes/validator';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup
  hide1 = true;
  hide2 = true;

  constructor() { }

  ngOnInit(): void {
    this.form =  new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,
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
                                    ]),
      confirmPassword: new FormControl('', [Validators.required])
    },
     {validators: CustomValidators.confirmValidator}
  )}

  onRegister() {
    console.log(this.form.get('email').value + ' ' + this.form.get('password').value);
    this.form.reset();
  }


}

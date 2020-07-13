import { AbstractControl, ValidatorFn, FormGroup } from "@angular/forms";


export class CustomValidators {

  constructor() {}

  static doNotAllowed(Element: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = Element.test(control.value);
      return result? { 'doNotAllowed' : {value: control.value},
      'notAllowed': true

    } : null ;
    }
  }

  static mustContain(Element: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = !(Element.test(control.value));
      return result? { 'mustContain' : {value: Element}} : null ;
    }
  }

  static firstSymbolCanNotBe(Element: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = Element.test(control.value[0]);
      return result? { 'firstSymbolCanNotBe' : {value: Element}} : null ;
    }
  }

  static firstSymbolMustBe(Element: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = ! (Element.test(control.value[0]));
      return result? { 'firstSymbolMustBe' : {value: Element}} : null ;
    }
  }

  static lastSymbolCanNotBe(Element: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = Element.test(control.value[control.value.length-1]);
      return result? { 'lastSymbolCanNotBe' : {value: Element}} : null ;
    }
  }

  static lastSymbolMustBe(Element: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = !( Element.test(control.value[control.value.length-1])) ;
      return result? { 'lastSymbolMustBe' : {value: Element}} : null ;
    }
  }

  static mustHaveUppercase(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = !( /[A-Z]/.test(control.value)) ;
      return result? { 'mustHaveUppercase' : {value: control.value}} : null ;
    }
  }

  static mustHaveLetter(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = !( /[a-zA-Z]/.test(control.value)) ;
      return result? { 'mustHaveLetter' : {value: control.value}} : null ;
    }
  }

  static mustHaveLowercase(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = !( /[a-z]/.test(control.value)) ;
      return result? { 'mustHaveLowercase' : {value: control.value}} : null ;
    }
  }

  static mustHaveNumber(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = !( /[0-9]/.test(control.value)) ;
      return result? { 'mustHaveNumber' : {value: control.value}} : null ;
    }
  }

  static canNotHaveNumber(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const result = /[0-9]/.test(control.value) ;
      return result? { 'canNotHaveNumber' : {value: control.value}} : null ;
    }
  }

  static confirmValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    return password.value !== confirmPassword.value ? {'misMatch': true} : null;
  }

}


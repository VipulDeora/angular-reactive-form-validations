import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ValidityService} from './validity.service';
import {usernameValidator} from './custom-validators';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html'
})

export class FormComponent implements OnInit {

  form: FormGroup;
  prohibitedNames = ['Raj', 'Ram', 'Shyam', 'Raju'];
  checkValidity = {
    email: true,
    password: true,
    addr1: true,
    fname: true,
    lname: true,
  };
  c = new Subject<any>();

  constructor(private fb: FormBuilder,
               private http: HttpClient,
               private validityService: ValidityService) {
    console.log('constructor');
  }

  validateFirstName(control: AbstractControl): { [s: string]: boolean } {
    if (this.prohibitedNames.includes(control.value)) {
      return {'invalidName': true};
    }
    return null;
  }

  validateLastName(control: AbstractControl): { [s: string]: boolean } {
    if (this.form && this.form.value.fname === control.value && control.value !== null) {
      return {'invalidLastName': true};
    }
    return null;
  }

  show() {
    console.log(this.form);
    this.c.next('something');
  }

  ngOnInit() {
    console.log('oninit');
    this.c.subscribe(val => {
    });
    this.form = this.fb.group({
      username: [null, {
        validators: [],
        asyncValidators: this.checkUsernameValidity.bind(this),
        updateOn: 'blur'
      }],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
      ],
      password: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,15}$')]],
      gender: ['female', Validators.required],
      addr1: [null],
      fname: [null, [Validators.required, this.validateFirstName.bind(this)]],
      lname: [null, [Validators.required, this.validateLastName.bind(this)]],
      isRequired: [false]
    });
    this.form.get('email').statusChanges
      .subscribe(value => this.checkValidity['email'] = value);
    this.form.get('password').statusChanges
      .subscribe(value => this.checkValidity['password'] = value);
    this.form.get('addr1').statusChanges
      .subscribe(value => this.checkValidity['addr1'] = value);
    this.form.get('fname').statusChanges
      .subscribe(value => this.checkValidity['fname'] = value);
    this.form.get('lname').statusChanges
      .subscribe(value => this.checkValidity['lname'] = value);
    this.form.get('isRequired').valueChanges
      .subscribe(value => {
        if (value) {
          this.form.get('addr1').setValidators(Validators.required);
          this.form.get('addr1').updateValueAndValidity();
        } else {
          this.form.get('addr1').setValidators(null);
          this.form.get('addr1').updateValueAndValidity();
        }
      });
    this.form.get('fname').valueChanges
      .subscribe(value => {
        if (value === this.form.value.lname) {
          this.form.get('lname').setErrors({'invalidLastName': true});
        } else if (this.form.value.lname === null) {
          this.form.get('lname').setErrors({'required': true});
        }
      });
  }

  printErrors() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control instanceof FormControl) {
        if (control.errors) {
          this.checkValidity[key] = false;
        }
      }
    });
  }

  isInvalid(field: string): boolean {
    return this.form.controls[field].invalid && this.form.controls[field].touched;
  }

  checkUsernameValidity(control: FormControl) {
    return this.validityService.getValidUsername(control.value)
      .pipe(
        map((res: {isValid: boolean}) => res.isValid ? null : {usernameTaken: true})
      );
  }
  submit() {
    if (this.form.valid) {
      console.log(this.form);
    } else {
      this.printErrors();
    }
  }
}

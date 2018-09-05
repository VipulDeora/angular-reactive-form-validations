import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {bind} from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html'
})

export class FormComponent implements OnInit, OnChanges, DoCheck {

  form: FormGroup;
  prohibitedNames = ['Raj', 'Ram', 'Shyam', 'Raju'];

  constructor(private fb: FormBuilder) { console.log('constructor'); }

  validateFirstName(control: AbstractControl): {[s: string]: boolean} {
    if (this.prohibitedNames.includes(control.value)) {
      return { 'invalidName': true};
    }
    return null;
  }

  show() {
    console.log(this.form);
  }

  ngDoCheck() {
    console.log('docheck');
  }

  ngOnChanges() {
    console.log('onchanges');
  }

  ngOnInit() {
    console.log('oninit');
    this.form = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,15}$')]],
      gender: ['female', Validators.required],
      addr1: [null],
      fname: [null, [Validators.required, this.validateFirstName.bind(this)]],
      lname: [null, Validators.required],
      city: [null],
      state: [null],
      zip: [null]
    });
  }

  submit() {
    console.log(this.form.value);
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html'
})

export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      gender: ['female', Validators.required],
      addr1: [null],
      addr2: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required]
    });
  }

  submit() {
    console.log(this.form.controls['password']);
  }
}

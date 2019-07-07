import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidityService {

  constructor(private http: HttpClient) { }

  getValidUsername(username: string) {
    return of({ isValid: true})
      .pipe(delay(2000));
  }
}

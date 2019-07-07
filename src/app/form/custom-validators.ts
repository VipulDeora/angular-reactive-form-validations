import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import {ValidityService} from './validity.service';

export const usernameValidator = (authService: ValidityService) => {
  return (input: FormControl) => {
    return authService.getValidUsername(input.value)
      .pipe(
        map((res) => {
          console.log(res);
          return null;
        })
      );
  };
};

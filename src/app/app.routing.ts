import {Routes} from '@angular/router';
import {FormComponent} from './form/form.component';

export const appRoutes: Routes = [{
  path: '',
  redirectTo: 'form',
  pathMatch: 'full'
}, {
  path: 'form',
  component: FormComponent
}, {
  path: '**',
  redirectTo: 'form'
}];

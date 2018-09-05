import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html'
})
export class ErrorDisplayComponent {

  @Input() displayError: boolean;
  @Input() message: boolean;
}

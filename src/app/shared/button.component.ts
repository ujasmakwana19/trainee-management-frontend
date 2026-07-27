import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button 
      [type]="type()" 
      [class]="'btn btn-' + variant()" 
      (click)="clicked.emit($event)">
      <!-- Used to insert the content html content -->
      <ng-content />
    </button>
  `,
  styles: [`
    .btn { padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .btn-primary { background: #007bff; color: white; }
    .btn-secondary { background: #6c757d; color: white; }
  `]
})

export class ButtonComponent {
  variant = input<ButtonVarient>(ButtonVarient.PRIMARY); 
  type = input<ButtonType>(ButtonType.BUTTON);

  clicked = output<MouseEvent>(); 
}

export enum ButtonVarient {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

export enum ButtonType {
    BUTTON = "button",
    SUBMIT = "submit"
}
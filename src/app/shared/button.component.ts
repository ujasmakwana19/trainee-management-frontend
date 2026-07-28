import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button 
      [type]="type()"  
      [disabled]="isDisable()"
      (click)="clicked.emit($event)">
      <!-- Used to insert the content html content -->
      <ng-content />
    </button>
  `,
  styles: [`
    button {
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.9375rem;
      background: var(--btn-color);
      color: #ffffff;
      transition: opacity 0.15s ease, transform 0.05s ease;
    }

    button:hover:not(:disabled) {
      opacity: 0.9;
    }

    button:active:not(:disabled) {
      transform: scale(0.97);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})

export class ButtonComponent {
  type = input<ButtonType>(ButtonType.BUTTON);
  isDisable = input<boolean>(false)
  clicked = output<MouseEvent>(); 
}

export enum ButtonType {
    BUTTON = "button",
    SUBMIT = "submit"
} 
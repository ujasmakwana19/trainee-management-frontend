import { Component, input, output } from '@angular/core';

export enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit"
}

export enum ButtonVariant  {
  DEFAULT = 'default',
  DANGER = 'danger' ,
  SAVE =  'save'
};

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button 
      [type]="type()"  
      [disabled]="isDisable()"
      [class]="variant()"
      (click)="clicked.emit($event)">
      <ng-content />
    </button>
  `,
  styles: [`
    button {
      padding: 0.5rem 0.875rem;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 550;
      font-size: 0.9375rem;
      color: #ffffff;
      background: var(--btn-color);
      transition: background-color 0.15s ease, transform 0.05s ease, opacity 0.15s ease, box-shadow 0.15s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    button:hover:not(:disabled) {
      opacity: 0.92;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }

    button:active:not(:disabled) {
      transform: scale(0.80);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }

    button.danger {
      background: var(--btn-danger-bg);
    }
    button.danger:hover:not(:disabled) {
      background: var(--btn-danger-hover);
    }

    button.save {
      background: var(--btn-save-bg);
    }
    button.save:hover:not(:disabled) {
      background: var(--btn-save-hover);
    }
    .btn-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ButtonComponent {
  type = input<ButtonType>(ButtonType.BUTTON);
  isDisable = input<boolean>(false);
  variant = input<ButtonVariant>(ButtonVariant.DEFAULT);
  clicked = output<MouseEvent>(); 
}
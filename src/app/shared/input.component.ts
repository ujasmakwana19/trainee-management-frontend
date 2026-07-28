import { Component, input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="field">
      @if (label()) {
        <label [for]="label()">{{ label() }}</label>
      }

      <input 
        [id]="label() || ''"
        [type]="type()" 
        [placeholder]="placeholder()" 
        [autocomplete]="autocomplete()"
        [formControl]="$any(control())"
        [class.invalid]="isInvalid"
      />

      @if (isInvalid) {
        <div class="error-msg">
          @if (control()?.hasError('required')) {
            <small>{{ label() || 'Field' }} is required.</small>
          } @else if (control()?.hasError('email')) {
            <small>Please enter a valid email address.</small>
          } @else if (control()?.hasError('minlength')) {
            <small>
              Must be at least {{ control()?.getError('minlength')?.requiredLength }} characters.
            </small>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    label {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-muted);
    }

    input {
      padding: 0.625rem 0.75rem;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      background: var(--bg-color);
      color: var(--text-color);
      font-family: inherit;
      font-size: 0.9375rem;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    input:focus {
      outline: none;
      border-color: var(--btn-color);
    }

    /* Error States */
    input.invalid {
      border-color: var(--error-color);
    }

    input.invalid:focus {
      border-color: var(--error-color);
      box-shadow: 0 0 0 1px var(--error-color);
    }

    .error-msg {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      margin-top: 0.125rem;
    }

    .error-msg small {
      color: var(--error-color);
      font-size: 0.75rem;
      font-weight: 500;
    }
  `]
})

export class InputComponent {
  label = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('');
  autocomplete = input<string>('off');
  
  // Pass the form control directly from the parent
  control = input<AbstractControl | null>(null);

  get isInvalid(): boolean {
    const ctrl = this.control();
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }
}
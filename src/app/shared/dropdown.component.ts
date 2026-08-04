import { Component, input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

export interface DropdownOption<T = any> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="field">
      @if (label()) {
        <label [for]="label()">{{ label() }}</label>
      }

      <select
        [id]="label() || ''"
        [formControl]="$any(control())"
        [class.invalid]="isInvalid"
      >
        @if (placeholder()) {
          <option [ngValue]="null" disabled selected hidden>
            {{ placeholder() }}
          </option>
        }

        @for (option of options(); track option.value) {
          <option [ngValue]="option.value">
            {{ option.label }}
          </option>
        }
      </select>

      @if (isInvalid) {
        <div class="error-msg">
          @if (control()?.hasError('required')) {
            <small>{{ label() || 'Field' }} is required.</small>
          } @else if (control()?.hasError('invalidStatus')) {
            <small>Please select a valid status.</small>
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

    select {
      padding: 0.625rem 0.75rem;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      background: var(--bg-color);
      color: var(--text-color);
      font-family: inherit;
      font-size: 0.9375rem;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem top 50%;
      background-size: 0.65rem auto;
      padding-right: 2rem;
    }

    select:focus {
      outline: none;
      border-color: var(--btn-color);
    }

    /* Error States */
    select.invalid {
      border-color: var(--error-color);
    }

    select.invalid:focus {
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
export class DropdownComponent {
  label = input<string>('');
  placeholder = input<string>('Select an option');
  options = input<DropdownOption[]>([]);
  control = input<AbstractControl | null>(null);

  get isInvalid(): boolean {
    const ctrl = this.control();
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }
}
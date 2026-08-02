import { Component, inject } from "@angular/core";
import { ToasterService } from "../../core/services/toaster/toaster.service";

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  template: `
    <div class="toast-stack">
        @for (t of toasterService.toasts(); track t.id) {
            <div
                class="toast"
                [class.toast-error]="t.type === 'error'"
                [class.toast-success]="t.type === 'success'"
            >
                <span>{{ t.message }}</span>
                <button class="toast-close" (click)="toasterService.dismiss(t.id)">X</button>
            </div>
        }
    </div>
  `,
  styles: [`
    .toast-stack {
      position: fixed;
      top: 80px;
      right: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 10000;
      max-width: 320px;
    }

    .toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 8px;
      background: var(--surface-color);
      color: var(--text-color);
      border: 1px solid var(--border-color);
      border-left: 4px solid transparent;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 0.9rem;
      animation: toast-in 0.2s ease-out;
    }

    .toast-error {
      border-left-color: var(--error-color);
    }

    .toast-success {
      border-left-color: var(--btn-save-bg);
    }

    .toast-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.1rem;
      line-height: 1;
      cursor: pointer;
      padding: 0 2px;
    }

    .toast-close:hover {
      color: var(--text-color);
    }

    @keyframes toast-in {
      from { opacity: 0; transform: translateX(16px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `]
})
export class ToasterComponent {
  toasterService = inject(ToasterService);
}
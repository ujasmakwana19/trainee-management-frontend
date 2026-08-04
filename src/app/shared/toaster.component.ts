import { Component, inject } from "@angular/core";
import { ToasterService } from "../core/services/toaster/toaster.service";

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  template: `
    <div 
      class="toast-stack" 
      role="region" 
      aria-label="Notifications"
    >
      @for (t of toasterService.toasts(); track t.id) {
        <div
          class="toast"
          [class.toast-error]="t.type === 'error'"
          [class.toast-success]="t.type === 'success'"
          [attr.role]="t.type === 'error' ? 'alert' : 'status'"
          [attr.aria-live]="t.type === 'error' ? 'assertive' : 'polite'"
          aria-atomic="true"
        >

          <span class="toast-message">{{ t.message }}</span>

          <button 
            type="button"
            class="toast-close" 
            aria-label="Dismiss notification" 
            (click)="toasterService.dismiss(t.id)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
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
      max-width: 360px;
      width: calc(100vw - 32px);
    }

    .toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 8px;
      background: var(--surface-color, #ffffff);
      color: var(--text-color, #1a1a1a);
      border: 1px solid var(--border-color, #e0e0e0);
      border-left: 5px solid transparent;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 0.9375rem;
      line-height: 1.4;
      animation: toast-in 0.2s ease-out;
    }

    .toast-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .toast-message {
      flex-grow: 1;
      word-break: break-word;
    }

    .toast-error {
      border-left-color: var(--error-color, #dc3545);
    }
    
    .toast-success {
      border-left-color: var(--btn-save-bg, #198754);
    }
    

    .toast-close {
      background: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      color: var(--text-muted, #6c757d);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 28px;
      min-height: 28px;
      padding: 4px;
      flex-shrink: 0;
      transition: background-color 0.15s ease, color 0.15s ease;
      outline: none;
    }

    .toast-close:hover {
      color: var(--text-color, #1a1a1a);
      background-color: rgba(0, 0, 0, 0.05);
    }

    .toast-close:focus-visible {
      outline: 2px solid var(--focus-ring, #005fcc);
      outline-offset: 2px;
      color: var(--text-color, #1a1a1a);
    }

    @keyframes toast-in {
      from { opacity: 0; transform: translateX(16px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @media (forced-colors: active) {
      .toast {
        border: 2px solid CanvasText;
      }
      .toast-close:focus-visible {
        outline: 2px solid Highlight;
      }
    }
  `]
})
export class ToasterComponent {
  protected toasterService = inject(ToasterService);
}
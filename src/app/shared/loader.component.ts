import { Component, inject } from "@angular/core";
import { LoaderService } from "../core/services/loader/loader.service";

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    @if(loaderService.isLoading()){
        <div class="loader-overlay" >
            <div class="spinner"></div>
        </div>
    }
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid var(--border-color);
      border-top-color: var(--swap-color);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
}
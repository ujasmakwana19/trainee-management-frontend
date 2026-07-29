import { Component } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SideBarComponent } from "./sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, RouterOutlet],
  template: `
    <div class="layout-container">
      <aside class="layout-sidebar">
        <app-side-bar />
      </aside>
      
      <div class="layout-main">
        <header class="layout-header">
          <app-header />
        </header>
        
        <main class="layout-content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      min-height: 100vh;
      background-color: var(--bg-color);
      color: var(--text-color);
    }

    .layout-sidebar {
      width: 260px;
      flex-shrink: 0;
      background-color: var(--surface-color);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
    }

    .layout-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0; 
    }

    .layout-header {
      height: 64px;
      background-color: var(--surface-color);
      border-bottom: 1px solid var(--border-color);
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .layout-content {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
    }
  `]
})
export class MainLayout {}
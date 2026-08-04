import { Component, inject, OnInit } from "@angular/core";
import { TraineeService } from "../../../../core/services/trainee/trainee.service";
import { TraineeResponse, TraineeStatus } from "../../../../core/services/trainee/trainee.model";
import { ButtonComponent, ButtonType, ButtonVariant } from "../../../../shared/button.component";
import { Router } from "@angular/router";
import { RoutePath } from "../../../../core/route.constant";
import { PermissionKey } from "../../../../core/permission.constant";

@Component({
  selector: 'trainee-view',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="page-container">
      <div class="header-actions">
        <app-button
          [type]="ButtonType.BUTTON"
          (clicked)="router.navigate([RoutePath.TRAINEE_BASE, RoutePath.ADD])"
          [permission]="PermissionKey.TRAINEE_ADD"
        >
          Add Trainee
        </app-button>
      </div>

      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Tech Stack</th>
              <th>Status</th>
              <th class="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (t of this.traineeService.trainees(); track t.id) {
              <tr>
                <td class="font-medium">{{ t.firstName }} </td>
                <td class="font-medium">{{ t.lastName }} </td>
                <td class="text-muted">{{ t.email }}</td>
                <td>
                  <span class="tech-badge">{{ t.techStack }}</span>
                </td>
                <td>
                  <span 
                    class="status-badge" 
                    [class]="{
                      'status-active': t.status === TraineeStatus.Active,
                      'status-inactive': t.status !== TraineeStatus.Active
                    }">
                    {{ TraineeStatus[t.status] }}
                  </span>
                </td>
                <td class="actions-cell">
                  <app-button
                    [type]="ButtonType.BUTTON"
                    [permission]="PermissionKey.TRAINEE_EDIT"
                    (clicked)="onEdit(t.id)"
                  >
                    Edit
                  </app-button>
                  <app-button
                    [type]="ButtonType.BUTTON"
                    [variant]="ButtonVariant.DANGER"
                    [permission]="PermissionKey.TRAINEE_DELETE"
                    (clicked)="onDelete(t.id)"
                  >
                    Delete
                  </app-button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="empty-state">
                  No trainees found.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%;
    }

    .header-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .table-card {
      background: var(--surface-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow-x: auto;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.875rem;
    }

    .data-table th, 
    .data-table td {
      padding: 0.875rem 1.25rem;
      border-bottom: 1px solid var(--border-color);
    }

    .data-table th {
      background: rgba(0, 0, 0, 0.02);
      color: var(--text-muted);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
    }

    [data-theme='dark'] .data-table th {
      background: rgba(255, 255, 255, 0.02);
    }

    .data-table tbody tr:last-child td {
      border-bottom: none;
    }

    .data-table tbody tr:hover {
      background: rgba(0, 0, 0, 0.015);
    }

    [data-theme='dark'] .data-table tbody tr:hover {
      background: rgba(255, 255, 255, 0.015);
    }

    .font-medium {
      font-weight: 500;
      color: var(--text-color);
    }

    .text-muted {
      color: var(--text-muted);
    }

    .actions-column {
      text-align: right;
    }

    .actions-cell {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.5rem;
    }

    .tech-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      background: rgba(79, 70, 229, 0.1);
      color: var(--primary-color);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status-active {
      background-color: rgba(22, 163, 74, 0.15);
      color: var(--btn-save-bg);
    }

    .status-inactive {
      background-color: rgba(239, 68, 68, 0.15);
      color: var(--error-color);
    }

    .empty-state {
      text-align: center;
      color: var(--text-muted);
      padding: 2rem !important;
    }
  `]
})
export class TraineeComponent implements OnInit {
  ButtonType = ButtonType;
  ButtonVariant = ButtonVariant;
  RoutePath = RoutePath;
  router = inject(Router);
  traineeService = inject(TraineeService);
  TraineeStatus = TraineeStatus;
  PermissionKey = PermissionKey;

  ngOnInit() {
    this.traineeService.getAll();
  }

  onEdit(id: string | number) {
    this.router.navigate([RoutePath.TRAINEE_BASE, RoutePath.EDIT, id]);
  }

  onDelete(id: string | number) {
    if (confirm("Are you sure you want to delete this trainee?")) {
      // Execute delete logic via service
    }
  }
}
import { Component, Input, Output, EventEmitter, input, signal } from "@angular/core";
import { ButtonComponent, ButtonType, ButtonVariant } from "../button.component";

export interface TableColumn<T = any> {
  key: keyof T & string;
  header: string;
  type?: 'text' | 'badge' | 'status';
  format?: (row: T) => string;
  getStatusClass?: (row: T) => string;
}

export interface TableAction<T = any> {
  label: string;
  variant: ButtonVariant;
  permission: string;
  onClick: (row: T) => void;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: `datatable.component.html`,
  styleUrl: `datatable.component.css`
})
export class DataTableComponent<T = unknown> {
    data = input.required<T[]>();
    columns = input.required<TableColumn<T>[]>();
    actions = input<TableAction<T>[]>([]);
    trackByProperty = input<keyof T>('id' as keyof T);
    emptyText = input<string>('No data available');

    ButtonType = ButtonType;

    trackByFn(row: T) {
        return row[this.trackByProperty()] ?? row;
    }
}
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";

export type ToastType = 'success' | 'error';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

const MAX_TOASTS = 4;
const DISMISS_MS = 3500;

@Injectable({ providedIn: 'root' })
export class ToasterService {
    private toastsSignal = signal<Toast[]>([]);
    readonly toasts = this.toastsSignal.asReadonly();

    private idCounter = 0;

    showError(errorRes: HttpErrorResponse): void {
        this.push(errorRes.error?.message ?? 'Something went wrong', 'error');
    }

    showMessage(message: string): void {
        this.push(message, 'success');
    }

    dismiss(id: number): void {
        this.toastsSignal.update(list => list.filter(t => t.id !== id));
    }

    private push(message: string, type: ToastType): void {
        const toast: Toast = { id: this.idCounter++, message, type };

        this.toastsSignal.update(list => {
            const next = [...list, toast];
            return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next;
        });

        setTimeout(() => this.dismiss(toast.id), DISMISS_MS);
    }
}
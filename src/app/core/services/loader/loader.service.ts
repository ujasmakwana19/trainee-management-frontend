import { Injectable, signal } from "@angular/core";

@Injectable({providedIn : 'root'})
export class LoaderService {
    private isLoadingSignal = signal<boolean>(false)
    private requestCount = 0

    readonly isLoading = this.isLoadingSignal.asReadonly();

    show() {
        this.requestCount++;
        this.isLoadingSignal.set(true);
    }

    hide() {
        this.requestCount = Math.max(0, this.requestCount - 1);
        if (this.requestCount === 0) {
            this.isLoadingSignal.set(false);
        }
    }

}
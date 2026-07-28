import { effect, Injectable, signal } from "@angular/core";

export type Theme = 'light' | 'dark'

@Injectable({providedIn : 'root'})
export class ThemeService {
    private readonly storageKey : string = 'theme-type'
    
    readonly theme = signal<Theme>(this.getInit())

    private getInit() : Theme {
        return localStorage.getItem(this.storageKey) === 'dark' ? 'dark' : 'light'
    }

    constructor(){
        // similar to useEffect in the React , it runs when the signal/state changes inside it
        effect(() => {
            const currentTheme = this.theme()
            localStorage.setItem(this.storageKey, currentTheme);
            document.documentElement.setAttribute('data-theme', currentTheme);
        })
    }

    toggleTheme(){
        this.theme.update((val) => (val === 'light' ? 'dark' : 'light'))
    }
}
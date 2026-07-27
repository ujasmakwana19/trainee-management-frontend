import { Service } from "@angular/core";

@Service()
export class ThemeService {
    readonly key : string = "theme"
    
    theme() : string {
        return localStorage.getItem(this.key) ?? 'light'
    }

    toggleTheme() : void {
        if(localStorage.getItem(this.key) === 'light')
            localStorage.setItem(this.key, 'dark')
        else if(localStorage.getItem(this.key) === 'dark')
            localStorage.setItem(this.key, 'light')
        else
            localStorage.setItem(this.key, 'light')
    }
}
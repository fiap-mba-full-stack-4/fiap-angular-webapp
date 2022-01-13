import { Component } from '@angular/core';
import { User } from './models/user';
import { TokenStorageService } from './services/token-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'fiap-angular-webapp';

    isLoggedIn: boolean = false;
    user: User | null = null;

    constructor(private tokenStorageService: TokenStorageService) { }

    ngOnInit(): void {
        this.user = this.tokenStorageService.getUser();
        this.isLoggedIn = !!this.user;
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {

    userIconLink: string = 'login'
    unsubscribe: Subject<boolean> = new Subject<boolean>()

    constructor(private tokenStorageService: TokenStorageService) {

    }

    ngOnInit(): void {
        const user: User | null = this.tokenStorageService.getUser();
        this.tokenStorageService.isLoggedIn().pipe(takeUntil(this.unsubscribe)).subscribe(
            isLoggedIn => {
                if (isLoggedIn) {
                    this.userIconLink = `user/details/${user!.id}`;
                }
                else {
                    this.userIconLink = 'login';
                }
            }
        )
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, of } from 'rxjs';
import { User } from '../models/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    private subjects: Map<string, BehaviorSubject<boolean>>;

    constructor() {
        this.subjects = new Map<string, BehaviorSubject<boolean>>();
    }

    public signOut(): void {
        if (!this.subjects.has(USER_KEY)) {
            this.subjects.set(USER_KEY, new BehaviorSubject<boolean>(false));
        } else {
            this.subjects.get(USER_KEY)?.next(false);
        }
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public saveUser(user: User): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        if (!this.subjects.has(USER_KEY)) {
            this.subjects.set(USER_KEY, new BehaviorSubject<boolean>(true));
        } else {
            this.subjects.get(USER_KEY)?.next(true);
        }
    }

    public getUser(): User | null {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (!!user) {
            return JSON.parse(user);
        }
        return null;
    }

    public isLoggedIn(): Observable<boolean> {
        if (!this.subjects.has(USER_KEY)) {
            this.subjects.set(USER_KEY, new BehaviorSubject<boolean>(false));
        }
        const user = this.getUser();
        this.subjects.get(USER_KEY)?.next(!!user);
        return this.subjects.get(USER_KEY)?.asObservable() ?? of(false);
    }

}

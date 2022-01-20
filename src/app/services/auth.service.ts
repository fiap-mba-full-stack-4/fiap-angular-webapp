import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const USER_API = environment.webapiurl + 'users';
const AUTH_API = USER_API + '/oauth2/authorization/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'appication/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(email: string): Observable<User[] | null> {
        return this.http.get<User[] | null>(USER_API + `?email=${email}`, httpOptions);
    }

    register(name: string, email: string, password: string): Observable<any> {
        return this.http.post(USER_API + '/', {
            'nome': name,
            'email': email,
            'password': password
        }, httpOptions);
    }

    loginGoogle(): Observable<any> {
        return this.http.get<any>(AUTH_API + 'google', httpOptions);
    }

    loginGithub(): Observable<any> {
        return this.http.get<any>(AUTH_API + 'github', httpOptions);
    }
}

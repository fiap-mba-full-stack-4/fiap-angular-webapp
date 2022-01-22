import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const USER_API = environment.gatewayApiUrl + '/users';
const AUTH_API = USER_API + '/oauth2/authorization';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'appication/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(USER_API + `/login`, {
            'email': email,
            'password': password
        }, httpOptions);
    }

    register(name: string, email: string, password: string): Observable<User> {
        return this.http.post<User>(USER_API + '/', {
            'nome': name,
            'email': email,
            'password': password
        }, httpOptions);
    }

    loginGoogle(): Observable<User> {
        return this.http.get<User>(AUTH_API + '/google', httpOptions);
    }

    loginGithub(): Observable<User> {
        return this.http.get<User>(AUTH_API + '/github', httpOptions);
    }
}

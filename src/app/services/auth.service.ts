import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const USER_API = 'http://localhost:3001/usuarios';

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
}

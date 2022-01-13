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
export class UserService {

    constructor(private http: HttpClient) { }

    update(userId: string, name: string, password: string): Observable<User[] | null> | null {
        let updateUser;
        this.http.put<string>(`${USER_API}/${userId}`, {
            nome: name,
            password: password
        }, httpOptions).subscribe(
            data => {
                updateUser = data
            }
        );
        console.log(updateUser);
        if (updateUser) {
            return this.http.get<User[] | null>(`${USER_API}/${userId}`, httpOptions);
        }
        else {
            return null
        }

    }
}

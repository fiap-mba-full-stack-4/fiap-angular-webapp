import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const USER_API = environment.gatewayApiUrl + '/users';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'appication/json' })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    update(userId: string, name: string, password: string): Observable<User> {
        let updateUser;
        return this.http.put<User>(`${USER_API}/${userId}`, {
            nome: name,
            password: password
        }, httpOptions);
    }
}

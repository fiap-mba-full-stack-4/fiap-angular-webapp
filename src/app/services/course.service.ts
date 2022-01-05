import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { CourseDetail } from '../models/courseDetail';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    baseURL: string = "http://localhost:3001/";

    constructor(private http: HttpClient) { }

    getCourses() {
        return this.http.get<CourseDetail[]>(this.baseURL + 'cursos/')
    }
}

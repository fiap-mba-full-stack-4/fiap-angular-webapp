import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { CourseDetail } from '../models/courseDetail';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    baseURL: string = "http://localhost:8082/";

    constructor(private http: HttpClient) { }

    getCourses() {
        return this.http.get<Course[]>(this.baseURL + 'cursos/')
    }

    getCourseDetails(id: number) {
        return this.http.get<CourseDetail>(this.baseURL + 'cursos/' + id)
    }
}

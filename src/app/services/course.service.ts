import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';
import { CourseDetail } from '../models/courseDetail';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    baseURL: string = environment.gatewayApiUrl;

    constructor(private http: HttpClient) { }

    getCourses() {
        return this.http.get<Course[]>(this.baseURL + '/courses/')
    }

    getCourseDetails(id: number) {
        return this.http.get<CourseDetail>(this.baseURL + '/courses/' + id)
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseURL: string = "http://localhost:8082/";

  constructor(private http: HttpClient) { }

  getCourses(){
    return this.http.get<Course>(this.baseURL + 'cursos/')
  }
}

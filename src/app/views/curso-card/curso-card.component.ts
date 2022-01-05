import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseDetail } from 'src/app/models/courseDetail';
import { CourseService } from 'src/app/services/course.service';

@Component({
    selector: 'app-curso-card',
    templateUrl: './curso-card.component.html',
    styleUrls: ['./curso-card.component.css']
})
export class CursoCardComponent implements OnInit {

    courses: any = [];

    constructor(private courseService: CourseService) { }

    ngOnInit(): void {
        this.courseService.getCourses().subscribe(data => {
            this.courses = data;
        })
    }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseDetail } from 'src/app/models/courseDetail';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css']
})
export class CursoDetailsComponent implements OnInit {

  course!: CourseDetail;
  panelOpenState = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      const routeParams = this.route.snapshot.paramMap;
      const courseIdFromRoute = Number(routeParams.get("courseId"));
      console.log(courseIdFromRoute)
      this.courseService.getCourseDetails(courseIdFromRoute).subscribe(data => {
          this.course = data;
          console.log(data)
      })
  }
}

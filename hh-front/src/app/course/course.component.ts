import { Component } from '@angular/core';
import { Course } from '../models';
import { CourseService } from '../course.service';
import { AuthService } from '../auth.service';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  courses:Course[]=[];
  logged: boolean = false;
  constructor(private courseService:CourseService){}

  ngOnInit(){
    const token =localStorage.getItem('token');
    if(token){
      this.logged=true;
    }
    this.getCourses();
  }


  getCourses(){
    this.courses = this.courseService.getCourse()
  }

}

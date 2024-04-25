import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course, Event} from './models';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  BASE_URL = 'http://localhost:8000'
  jsonDataResult:any;
  // courses:Course[]=[];
  courses:Course[]=[{id:1,courseName:'The Complete Python Bootcamp From Zero to Hero in Python',specialization: "Python Developer",url:'https://www.udemy.com/course/complete-python-bootcamp/'},
    {id:2,courseName:'Machine Learning A-Z™:',specialization:"Data Science",url:'https://www.udemy.com/course/machinelearning/'},
    {id:3,courseName:'Windows Server 2019 - Go from Zero to Hero',specialization:"System Admin",url:'https://www.udemy.com/course/windows-server-2019-go-from-zero-to-hero/'},
    {id:4,courseName:'2023 Beginner\'s guide to Cyber Security',specialization:"Cyber Security",url:'https://www.udemy.com/course/2021-beginners-guide-to-cyber-security/'},
    {id:5,courseName:'DevOps Beginners to Advanced | Decoding DevOps with Projects',specialization:"DevOps",url:'https://www.udemy.com/course/decodingdevops/'},
    {id:6,courseName:'iOS & Swift: Become An App Developer',specialization:"IOS Developer",url:'https://www.udemy.com/course/devslopes-ios12/'},
  ]
  constructor(private client: HttpClient) { }
  getCourses(): Observable<Course[]> {
    return this.client.get<Course[]>(
      `${this.BASE_URL}/api/courses/`
    )
  }
  getCourse() {
    return this.courses
  }

}

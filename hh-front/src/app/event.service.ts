import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Event } from './models';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  BASE_URL = 'http://localhost:8000'
  // jsonDataResult:any;
  // userCourses:Event[]=[];
  events:Event[]=[{id:1,eventName:'Data Award 2024',specialization: "Data Science",url:'https://all-events.ru/events/data-award-2023/'},
    {id:2,eventName:'TECH FORUM & AWARDS',specialization:"Data Science",url:'https://www.udemy.com/course/machinelearning/'},
    {id:3,eventName:'IT Security Day ',specialization:"Cyber Security",url:'https://all-events.ru/events/it-security-day-2023/'},
    {id:4,eventName:'TeamLead ITHRFest ',specialization:"Python",url:'TeamLead ITHRFest 2023'},
  ]
  constructor(private client: HttpClient) { }
  getEvents(): Observable<Event[]> {
    return this.client.get<Event[]>(
      `${this.BASE_URL}/api/events/`
    )
  }
  getEvent() {
    return this.events
  }

}

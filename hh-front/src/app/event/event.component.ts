import { Component } from '@angular/core';
import { Event } from '../models';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  events:Event[]=[];
  logged: boolean = false;
  constructor(private eventService:EventService){}


  ngOnInit(){
    const token =localStorage.getItem('token');
    if(token){
      this.logged=true;
    }
    this.getEvents();
  }


  getEvents(){
    this.events = this.eventService.getEvent()
  }

}

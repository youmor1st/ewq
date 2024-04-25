import { Component } from '@angular/core';
import { Vacancy } from '../models';
import { AuthService } from '../auth.service';
import { VacancyService } from '../vacancy.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  logged: boolean = false;
  username:string='';
  vacancies:Vacancy[]=[];
  jsonDataResult:any;
  constructor(private vacancyService: VacancyService,private http:HttpClient) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
      console.log(token)
      const username=localStorage.getItem('username')
      if (username){
        this.username=username

      }
      this.initVacancies()

    }

  }
  initVacancies(){
    this.vacancyService.getUserVacancies(this.username).subscribe((data)=>{
      this.vacancies=data
      console.log(data)
    })
  }
  deleteVacancy(id:number){
    console.log(id)
  }
}

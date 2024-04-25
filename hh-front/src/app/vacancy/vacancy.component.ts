import { Component } from '@angular/core';
import { Company, Vacancy } from '../models';
import { VacancyService } from '../vacancy.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent {
  vacancies:Vacancy[]=[];
  logged: boolean = false;
  test:Company[]=[]
  constructor(private vacancyService:VacancyService){}
  ngOnInit(){
    const token =localStorage.getItem('token');
    if(token){
      this.logged=true;
    }
      this.getVacancies();
  }
  getVacancies(){
    this.vacancyService.getVacancies().subscribe((z)=>{
      this.vacancies=z
    })
  }
  submit(id:number){
    const username = localStorage.getItem('username');
    console.log(username)
    if (username){
      const token =localStorage.getItem('token');
      if (token){
        this.vacancyService.addVacancy(id,username).subscribe((status)=>{
          if(status){
            console.log(status)
          }
        })
      }
    }
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Application, Company, Vacancy ,Company1,Status} from './models';
@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  BASE_URL = 'http://localhost:8000'
  jsonDataResult:any;
  userVacancies:Vacancy[]=[];
  constructor(private client: HttpClient) { }
  getVacancies(): Observable<Vacancy[]> {
    return this.client.get<Vacancy[]>(
      `${this.BASE_URL}/api/vacancies/`
    )
  }
  getCompanies(): Observable<Company[]> {
    return this.client.get<Company[]>(`${this.BASE_URL}/api/companies/`);
  }
  addVacancy(id:number,username:string):Observable<Status>{
    return this.client.post<Status>(`${this.BASE_URL}/api/vacancies/add`,{vacancy_id:id,user_id:username})
  }
  addVacancyJSON(id:number,username:string){
    this.client.post<Application>('assets/data.json',{username,id})
  }
  getUserVacancies(username:string): Observable<Vacancy[]> {
    return this.client.post<Vacancy[]>(
      `${this.BASE_URL}/api/uservacancies/`,{user_id:username,vacancy_id:"2"})
  }
  getUserVacanciesTest(username:string) {
    let userVacancies:Vacancy[]=[]
    return userVacancies
  }
}

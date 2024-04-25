import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacancy } from '../models/vacancy.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  private baseUrl = environment.apiUrl + '/vacancies';

  constructor(private http: HttpClient) { }

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.baseUrl);
  }

  getVacanciesForCompany(companyId: number): Observable<Vacancy[]> {
    const url = `${this.baseUrl}/?company=${companyId}`;
    return this.http.get<Vacancy[]>(url);
  }
}

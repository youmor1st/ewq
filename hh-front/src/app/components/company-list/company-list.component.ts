import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { Vacancy } from '../../models/vacancy.model';
import { VacancyService } from '../../services/vacancy.service';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
      },
      (error) => {
        console.error('Error fetching companies', error);
      }
    );
  }

 showVacancies(company: Company): void {
  this.companyService.getVacanciesForCompany(company.id).subscribe(
    (vacancies: Vacancy[]) => {
      company.vacancies = vacancies; // Сохраняем вакансии в объекте Company
    },
    (error) => {
      console.error('Error fetching vacancies for company', error);
    }
  );
}
}

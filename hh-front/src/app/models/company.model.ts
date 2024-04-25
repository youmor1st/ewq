import {Vacancy} from "./vacancy.model";

export interface Company {
  id: number;
  name: string;
  description: string;
  city: string;
  address: string;
  vacancies: Vacancy[];
}

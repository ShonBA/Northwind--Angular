import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import routesConfig from '../Utils/routes.config';
import EmployeeModel from '../models/employee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  public async getAllEmployees(): Promise<EmployeeModel[]> {
    const observable = this.http.get<EmployeeModel[]>(routesConfig.employeesUrl);
    const employees = await firstValueFrom(observable);
    return employees;
  };

  public async addEmployee(employee: EmployeeModel) {
    const formData = new FormData();
    formData.append("firstName", employee.firstName);
    formData.append("lastName", employee.lastName);
    formData.append("title", employee.title);
    formData.append("country", employee.country);
    formData.append("city", employee.city);
    formData.append("birthDate", employee.birthDate);
    formData.append("image", employee.image);
    const observable = this.http.post<EmployeeModel>(routesConfig.employeesUrl, formData);
    const addedEmployee = await firstValueFrom(observable);
    console.log(addedEmployee);
  }

  public async deleteEmployee(id: number) {
    const observable = this.http.delete(routesConfig.employeesUrl + id);
    await firstValueFrom(observable);
  }
}

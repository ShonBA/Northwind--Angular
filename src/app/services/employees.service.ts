import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import routesConfig from '../Utils/routes.config';
import EmployeeModel from '../models/employee-model';
import { EmployeesAction, EmployeesActionTypes, employeesStore } from '../redux/employees-state';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  public async getAllEmployees(): Promise<EmployeeModel[]> {
    let employees = employeesStore.getState().employees;
    if (employees.length === 0) {
      const observable = this.http.get<EmployeeModel[]>(routesConfig.employeesUrl);
      employees = await firstValueFrom(observable);
    }
    const action: EmployeesAction = { type: EmployeesActionTypes.SetEmployees, payload: employees };
    employeesStore.dispatch(action);
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
    const action: EmployeesAction = { type: EmployeesActionTypes.AddEmployee, payload: addedEmployee };
    employeesStore.dispatch(action);
  }

  public async deleteEmployee(id: number) {
    const observable = this.http.delete(routesConfig.employeesUrl + id);
    await firstValueFrom(observable);
    const action: EmployeesAction = { type: EmployeesActionTypes.DeleteEmployee, payload: id };
    employeesStore.dispatch(action);
  }
}

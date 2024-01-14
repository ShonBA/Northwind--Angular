import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import EmployeeModel from '../../../models/employee-model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit {

  public employees: EmployeeModel[] = [];

  public constructor(private title: Title,private employeesService: EmployeesService, private router: Router) { }

  public async ngOnInit() {
    try {
      this.employees = await this.employeesService.getAllEmployees();
      this.title.setTitle("Employees List")
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async deleteMe(id: number) {
    try {
      await this.employeesService.deleteEmployee(id);
      this.router.navigateByUrl("/home");
    } catch (err: any) {
      alert(err.message);
    }
  }
}

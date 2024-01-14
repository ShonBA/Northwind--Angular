import { Component, OnInit } from '@angular/core';
import EmployeeModel from '../../../models/employee-model';
import { EmployeesService } from '../../../services/employees.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  public employee = new EmployeeModel();

  public constructor(private title: Title, private employeesService: EmployeesService, private router: Router) { }

  public ngOnInit(): void {
    this.title.setTitle("Add Employee");
  }
  public saveImage(args: Event) {
    const input = args.target as HTMLInputElement;
    this.employee.image = input.files[0];
  }

  public async send() {
    try {
      await this.employeesService.addEmployee(this.employee);
      this.router.navigateByUrl("/employees");
    } catch (err: any) {
      alert(err.message)
    }
  }
}

import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],
})
export class EmployeeList implements OnInit {

  private employeeService = inject(EmployeeService);

  employees = signal<EmployeeModel[]>([]);

  constructor() {
    console.log('EmployeeList Constructor');
  }

  ngOnInit(): void {

    console.log('EmployeeList ngOnInit');

    this.employeeService.getEmployees().subscribe({

      next: (response) => {

        console.log('API Response', response);

        this.employees.set(response);

        console.log('Signal Value', this.employees());

        console.log('Length', this.employees().length);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}
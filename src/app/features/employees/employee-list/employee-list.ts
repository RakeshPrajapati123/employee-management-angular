import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],
})
export class EmployeeList implements OnInit {

  private employeeService = inject(EmployeeService);

  private router = inject(Router);

  searchText = '';

  statusFilter = 'All';

  employees = signal<EmployeeModel[]>([]);

  filteredEmployees = signal<EmployeeModel[]>([]);

  constructor() {
    console.log('EmployeeList Constructor');
  }

  ngOnInit(): void {

    console.log('EmployeeList ngOnInit');

    this.employeeService.getEmployees().subscribe({

      next: (response) => {

        console.log('API Response', response);

        this.employees.set(response.data);

        this.filteredEmployees.set(response.data);

        console.log('Signal Value', this.employees());

        console.log('Length', this.employees().length);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  filterEmployees(): void {

  const search = this.searchText.toLowerCase().trim();

  const filtered = this.employees().filter(employee => {

    const matchesName =
      employee.employeeName.toLowerCase().includes(search);

    const matchesStatus =
      this.statusFilter === 'All' ||
      employee.isActive.toString() === this.statusFilter;

    return matchesName && matchesStatus;

  });

  this.filteredEmployees.set(filtered);

}

resetFilter(): void {

  this.searchText = '';

  this.statusFilter = 'All';

  this.filteredEmployees.set(this.employees());

}

viewEmployee(employeeID: number): void {

  this.router.navigate(['/employees/details', employeeID]);

}

}
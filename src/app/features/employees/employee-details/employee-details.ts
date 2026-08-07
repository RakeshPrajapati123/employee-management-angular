import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service'; 
import { EmployeeModel } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})

export class EmployeeDetails implements OnInit, OnDestroy {

  constructor() {
  console.log('***** EMPLOYEE DETAILS COMPONENT LOADED *****');
}

private employeeService = inject(EmployeeService);

  private route = inject(ActivatedRoute);

  employee: any = null;

  ngOnInit(): void {
console.log('✅ EmployeeDetails ngOnInit');
    const employeeId = Number(
      this.route.snapshot.paramMap.get('id')
      
    );

    

    this.loadEmployee(employeeId);

  }

  ngOnDestroy(): void {
  console.log('❌ EmployeeDetails ngOnDestroy');
}

  loadEmployee(id: number): void {

    this.employeeService.getEmployeeById(id)
      .subscribe({

       next: (response) => {

  console.log('NEXT CALLED');

  this.employee = response.data;

  console.log('Assigned:', this.employee);

},

        error: (error) => {

          console.error(error);

        }

      });

  }

}

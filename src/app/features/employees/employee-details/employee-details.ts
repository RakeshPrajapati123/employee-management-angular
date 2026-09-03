import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { EmployeeGetDetailsModel } from '../../../models/employee/employee-get-details.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})

export class EmployeeDetails implements OnInit {

  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  employee: EmployeeGetDetailsModel | null = null;

  ngOnInit(): void {

    const employeeId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadEmployee(employeeId);
  }

  loadEmployee(id: number): void {

    this.employeeService.getEmployeeById(id)
      .subscribe({

        next: (response) => {

          this.employee = response.data;

          },

        error: (error) => {
  
  this.notificationService.error(
    error?.error?.message || 'Unable to load employee details.'
  );

}
      });
  }
}
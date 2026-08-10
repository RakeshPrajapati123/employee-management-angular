import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeModel } from '../../../models/employee.model';
import { NotificationService } from '../../../core/services/notification.service';

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
  private cdr = inject(ChangeDetectorRef);
  private notificationService = inject(NotificationService);

  employee: EmployeeModel | null = null;

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

          this.cdr.markForCheck();
        },

        error: (error) => {

  console.error('Error loading employee:', error);

  this.notificationService.error(
    error?.error?.message || 'Unable to load employee details.'
  );

}
      });
  }
}
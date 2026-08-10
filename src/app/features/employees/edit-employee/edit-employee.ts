import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { RoleModel } from '../../../models/role.model';
import { DesignationModel } from '../../../models/designation.model';
import { UpdateEmployeeRequest } from '../../../models/update-employee.model';
import { EmployeeGetDetailsModel } from '../../../models/employee-get-details.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css',
})
export class EditEmployee {
  private fb = inject(FormBuilder);

  private employeeService = inject(EmployeeService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private notificationService = inject(NotificationService);

  employeeID!: number;

  designations: DesignationModel[] = [];

  roles: RoleModel[] = [];

  employeeForm = this.fb.group({
    employeeName: ['', Validators.required],

    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

    alternatePhone: [''],

    email: ['', [Validators.required, Validators.email]],

    address: [''],

    city: ['', Validators.required],

    state: ['', Validators.required],

    pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],

    designationID: [0, Validators.required],

    roleID: [0, Validators.required],

    isActive: [true],
  });

  ngOnInit(): void {
    this.employeeID = Number(this.route.snapshot.paramMap.get('id'));

    this.getDesignations();

    this.getRoles();

    this.loadEmployee();
  }

  getDesignations(): void {
    this.employeeService.getDesignations().subscribe({
      next: (response) => {
        this.designations = response.data.filter((x) => x.isActive);
      },

      error: (error) => {
        console.error('Error loading designations:', error);

        this.notificationService.error(error?.error?.message || 'Unable to load designations.');
      },
    });
  }

  getRoles(): void {
    this.employeeService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data.filter((x) => x.isActive);
      },

      error: (error) => {
        console.error('Error loading roles:', error);

        this.notificationService.error(error?.error?.message || 'Unable to load roles.');
      },
    });
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeID).subscribe({
      next: (response) => {
        const employee = response.data;

        this.employeeForm.patchValue({
          employeeName: employee.employeeName,

          phone: employee.phone,

          alternatePhone: employee.alternatePhone,

          email: employee.email,

          address: employee.address,

          city: employee.city,

          state: employee.state,

          pinCode: employee.pinCode,

          //designationID: employee.designationID,

          //roleID: employee.roleID,

          isActive: employee.isActive,
        });
      },

      error: (error) => {
        console.error('Error loading employee:', error);
        this.notificationService.error(error?.error?.message || 'Unable to load employee details.');
      },
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();

      this.notificationService.warning(
        'Please correct the highlighted fields before updating the employee.',
      );

      return;
    }

    const employee: UpdateEmployeeRequest = {
      employeeID: this.employeeID,

      employeeName: this.employeeForm.value.employeeName!,

      phone: this.employeeForm.value.phone!,

      alternatePhone: this.employeeForm.value.alternatePhone || '',

      email: this.employeeForm.value.email!,

      address: this.employeeForm.value.address || '',

      city: this.employeeForm.value.city!,

      state: this.employeeForm.value.state!,

      pinCode: this.employeeForm.value.pinCode!,

      designationID: Number(this.employeeForm.value.designationID),

      roleID: Number(this.employeeForm.value.roleID),

      isActive: this.employeeForm.value.isActive ?? true,
    };

    this.employeeService.updateEmployee(this.employeeID, employee).subscribe({
      next: (response) => {
        console.log('Employee updated successfully:', response);

        this.router.navigate(['/employees']).then(() => {
          this.notificationService.success(response.message || 'Employee updated successfully.');
        });
      },

      error: (error) => {
        console.error(
          'Error updating employee:',

          error,
        );
        this.notificationService.error(error?.error?.message || 'Unable to update employee.');
      },
    });
  }

  resetForm(): void {
    this.loadEmployee();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { RoleModel } from '../../../models/role/role.model';
import { DesignationModel } from '../../../models/designation/designation.model';
import { AddEmployeeRequest } from '../../../models/employee/add-employee.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})

export class AddEmployee implements OnInit {

  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);

    employeeForm = this.fb.group({
    employeeName: ['', Validators.required],

    phone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],

    alternatePhone: ['', Validators.pattern('^[6-9][0-9]{9}$')],

    email: ['', [Validators.required, Validators.email]],

    address: [''],

    city: ['', Validators.required],

    state: ['', Validators.required],

    pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],

    designationID: [0, [Validators.required, Validators.min(1)]],

    roleID: [0, [Validators.required, Validators.min(1)]],

  });

  private employeeService = inject(EmployeeService);

  private router = inject(Router);

  designations: DesignationModel[] = [];

  roles: RoleModel[] = [];

  ngOnInit(): void {

    this.getDesignations();

    this.getRoles();
  }

  getDesignations(): void {
    this.employeeService.getDesignations().subscribe({
      next: (response) => {
       
        this.designations = response.data.filter((x) => x.isActive);

        },

      error: (error) => {

        this.notificationService.error(
    error?.error?.message || 'Unable to load designations.'
  );
      },
    });
  }

  getRoles(): void {
    this.employeeService.getRoles().subscribe({
      next: (response) => {
        
        this.roles = response.data.filter((x) => x.isActive);

        },

      error: (error) => {

        this.notificationService.error(
    error?.error?.message || 'Unable to load roles.'
  );
      },
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();

      this.notificationService.warning(
        'Please correct the highlighted fields before saving the employee.',
      );

      return;
    }

    const employee: AddEmployeeRequest = {
      
      employeeName: this.employeeForm.value.employeeName!,
      phone: this.employeeForm.value.phone!,
      alternatePhone: this.employeeForm.value.alternatePhone || undefined,
      email: this.employeeForm.value.email!,
      address: this.employeeForm.value.address!,
      city: this.employeeForm.value.city!,
      state: this.employeeForm.value.state!,
      pinCode: this.employeeForm.value.pinCode!,
      designationID: Number(this.employeeForm.value.designationID),
      roleID: Number(this.employeeForm.value.roleID),
      isActive: true,
    };

    this.employeeService.addEmployee(employee).subscribe({
      next: (response) => {

   this.router.navigate(['/employees']).then(() => {

    this.notificationService.success(
      response.message || 'Employee added successfully.'
    );

  });

},

      error: (error) => {
        
        this.notificationService.error(error?.error?.message || 'Unable to add employee.');
      },
    });
  }

  resetForm(): void {
  this.employeeForm.reset({
    employeeName: '',
    phone: '',
    alternatePhone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    designationID: 0,
    roleID: 0,
  });
}

 
}

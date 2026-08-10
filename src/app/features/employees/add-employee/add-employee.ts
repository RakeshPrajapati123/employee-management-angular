import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
// import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
// import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';
import { RoleModel } from '../../../models/role.model';
import { DesignationModel } from '../../../models/designation.model';
import { ChangeDetectorRef } from '@angular/core';
import { AddEmployeeRequest } from '../../../models/add-employee.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})

export class AddEmployee {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private notificationService = inject(NotificationService);

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
        console.log('Designations');

        console.log(response);

        this.designations = response.data.filter((x) => x.isActive);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
        this.notificationService.error(
    error?.error?.message || 'Unable to load designations.'
  );
      },
    });
  }

  getRoles(): void {
    this.employeeService.getRoles().subscribe({
      next: (response) => {
        console.log('Roles');

        console.log(response);

        this.roles = response.data.filter((x) => x.isActive);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
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

  console.log(response);

  this.router.navigate(['/employees']).then(() => {

    this.notificationService.success(
      response.message || 'Employee added successfully.'
    );

  });

},

      error: (error) => {
        console.log(error);

        this.notificationService.error(error?.error?.message || 'Unable to add employee.');
      },
    });
  }

  //console.log(this.employeeForm.value);

  // Call EmployeeService here
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { RoleModel } from '../../../models/role/role.model';
import { DesignationModel } from '../../../models/designation/designation.model';
import { UpdateEmployeeRequest } from '../../../models/employee/update-employee.model';
import { EmployeeGetDetailsModel } from '../../../models/employee/employee-get-details.model';
import { NotificationService } from '../../../shared/services/notification.service';

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

  private originalEmployee!: EmployeeGetDetailsModel;

  designations: DesignationModel[] = [];

  roles: RoleModel[] = [];

  employeeForm = this.fb.group({
    employeeName: ['', Validators.required],

    phone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],

    alternatePhone: ['', [Validators.pattern('^[6-9][0-9]{9}$')]],

    email: ['', [Validators.required, Validators.email]],

    address: [''],

    city: ['', Validators.required],

    state: ['', Validators.required],

    pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],

    designationID: [0, [Validators.required, Validators.min(1)]],

    roleID: [0, [Validators.required, Validators.min(1)]],

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
        
        this.notificationService.error(error?.error?.message || 'Unable to load roles.');
      },
    });
  }

  loadEmployee(): void {
  this.employeeService.getEmployeeById(this.employeeID).subscribe({
    next: (response) => {
      const employee = response.data;

      this.originalEmployee = employee;

      this.employeeForm.patchValue({
        employeeName: employee.employeeName,
        phone: employee.phone,
        alternatePhone: employee.alternatePhone,
        email: employee.email,
        address: employee.address,
        city: employee.city,
        state: employee.state,
        pinCode: employee.pinCode,
        designationID: employee.designationID,
        roleID: employee.roleID,
        isActive: employee.isActive,
      });
    },

    error: (error) => {
      
      this.notificationService.error(
        error?.error?.message || 'Unable to load employee details.'
      );
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
        
        this.router.navigate(['/employees']).then(() => {
          this.notificationService.success(response.message || 'Employee updated successfully.');
        });
      },

      error: (error) => {
        this.notificationService.error(error?.error?.message || 'Unable to update employee.');
      },
    });
  }

  resetForm(): void {
  if (!this.originalEmployee) {
    return;
  }

  const employee = this.originalEmployee;

  this.employeeForm.patchValue({
    employeeName: employee.employeeName,
    phone: employee.phone,
    alternatePhone: employee.alternatePhone,
    email: employee.email,
    address: employee.address,
    city: employee.city,
    state: employee.state,
    pinCode: employee.pinCode,
    designationID: employee.designationID,
    roleID: employee.roleID,
    isActive: employee.isActive,
  });
}
}

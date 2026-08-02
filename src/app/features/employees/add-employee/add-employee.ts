import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// import { Employee } from '../../models/employee.model';
 import { EmployeeService } from '../../../core/services/employee.service';  
// import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';
import { RoleModel } from '../../../models/role.model';
import { DesignationModel } from '../../../models/designation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})

export class AddEmployee {

private fb = inject(FormBuilder);

employeeForm = this.fb.group({

  employeeName: ['', Validators.required],

  phone: ['', [
    Validators.required,
    Validators.pattern('^[0-9]{10}$')
  ]],

  alternatePhone: [''],

  email: ['', [
    Validators.required,
    Validators.email
  ]],

  address: [''],

  city: ['', Validators.required],

  state: ['', Validators.required],

  pinCode: ['', [
    Validators.required,
    Validators.pattern('^[0-9]{6}$')
  ]],

   designationID: [0, Validators.required],

  roleID: [0, Validators.required]

});

private employeeService = inject(EmployeeService);

designations: DesignationModel[] = [];

roles: RoleModel[] = [];

ngOnInit(): void {

    this.getDesignations();

    this.getRoles();

}

getDesignations(): void {

    this.employeeService.getDesignations()
        .subscribe({

            next: (response) => {

                console.log('Designations');

                console.log(response);

                this.designations = response.filter(x => x.isActive);

            },

            error: (error) => {

                console.error(error);

            }

        });

}

getRoles(): void {

    this.employeeService.getRoles()
        .subscribe({

            next: (response) => {

                console.log('Roles');

                console.log(response);

                this.roles = response.filter(x => x.isActive);

            },

            error: (error) => {

                console.error(error);

            }

        });

}

}

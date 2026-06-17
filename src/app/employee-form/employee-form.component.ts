import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { Employee } from '../models/employee';
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";
import { NgClass, NgIf } from "../../../node_modules/@angular/common/index";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    position: ''
  }

  errorMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  submitForm() : void {
    this.employeeService.crerateEmployee(this.employee)
    .subscribe({next: () => {
      this.router.navigate(['/']);
    }, 
    error: (error) => { 
      this.errorMessage = 'Failed to create employee. Please try again.';
      console.error('Error creating employee:', error);
    }
});
    
  }

}

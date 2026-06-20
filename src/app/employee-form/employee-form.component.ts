import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../models/employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    position: '',
  };

  isEditing: boolean = false;

  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.paramMap.subscribe((result) => {
      const id = result.get('id');
      if (id) {
        this.isEditing = true;
        this.employeeService.getEmployeeById(Number(id)).subscribe({
          next: (result) => (this.employee = result),
          error: (error) => {
            this.errorMessage =
              'Failed to load employee data. Please try again.';
            console.error('Error loading employee data:', error);
          },
        });
      }
    });
  }

  submitForm(): void {
    this.employeeService.crerateEmployee(this.employee).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Failed to create employee. Please try again.';
        console.error('Error creating employee:', error);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
})
export class EmployeeTableComponent {
  employees: Employee[] = [];
  successMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private location: Location, // removes success message from URL after page reload
  ) {
    const nav = this.router.getCurrentNavigation();
    this.successMessage = nav?.extras?.state?.['successMessage'] ?? '';
    if (this.successMessage) {
      this.location.replaceState(this.location.path(), '', {});
    }
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(data);
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(
          (employee) => employee.id !== id,
        );
        this.successMessage = 'Employee deleted successfully!';
        console.log('Employee deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
      },
    });
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeForm } from '../employee-form/employee-form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule, EmployeeForm],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];

  showForm = false;
  successMessage = '';
  constructor(private employeeService: EmployeeService) {}

  selectedEmployee: Employee = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    dateOfJoining: '',
    createdAt: '',
  };

  searchTerm: string = '';

  ngOnInit(): void {
    this.loadEmployees();
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
      },
      error: (err: unknown) => {
        console.error(err);
      },
    });
  }

  addEmployee(employee: Employee): void {
    employee.dateOfJoining = new Date().toISOString();
    employee.createdAt = new Date().toISOString();

    this.employeeService.addEmployee(employee).subscribe({
      next: () => {
        this.loadEmployees();
        this.cancelForm();
        this.showSuccessMessage('Employee added successfully');
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteEmployee(id: number): void {
    if (!confirm('Delete this employee?')) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();
        this.showSuccessMessage('Employee deleted successfully');
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  editEmployee(employee: Employee): void {
    this.selectedEmployee = {
      ...employee,
    };

    this.showForm = true;
  }

  saveEmployee(employee: Employee): void {
    if (employee.employeeId === 0) {
      this.addEmployee(employee);
    } else {
      this.updateEmployee(employee);
    }
  }

  updateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee.employeeId, employee).subscribe({
      next: () => {
        this.loadEmployees();
        this.cancelForm();
        this.showSuccessMessage('Employee updated successfully');
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  filteredEmployees(): Employee[] {
    if (!this.searchTerm) {
      return this.employees;
    }

    return this.employees.filter(
      (e) =>
        e.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.department?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.position?.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  cancelForm(): void {
    this.showForm = false;

    this.selectedEmployee = {
      employeeId: 0,
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      position: '',
      dateOfJoining: '',
      createdAt: '',
    };
  }
}

import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  @Output() saveEmployee = new EventEmitter<Employee>();
  @Output() cancelForm = new EventEmitter<void>();

  @Input() employee: Employee = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    dateOfJoining: '',
    createdAt: '',
  };

  save() {
    this.saveEmployee.emit(this.employee);

    this.employee = {
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

  cancel() {
    this.cancelForm.emit();
  }
}

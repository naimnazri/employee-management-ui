import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // private apiUrl = 'http://localhost:5208/api/employees';

  // constructor(private http: HttpClient) { }

  // getEmployees(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.apiUrl);
  // }

  private employees: Employee[] = [
    {
      employeeId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      department: 'IT',
      position: 'Developer',
      dateOfJoining: '2025-01-01',
      createdAt: '2025-01-01'
    },
    {
      employeeId: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@gmail.com',
      department: 'HR',
      position: 'Manager',
      dateOfJoining: '2024-05-15',
      createdAt: '2024-05-15'
    }
  ];

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

}
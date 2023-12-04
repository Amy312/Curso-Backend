package com.upb.projecttwo.services;

import com.upb.projecttwo.models.Employee;

import java.util.List;

public interface EmployeeService {
    Employee save(Employee employee);

    Employee getEmployeeById(String id);
    List<Employee> getEmployees();
    boolean deleteEmployee(String id);
    Employee updateEmployee(String id, Employee employee);
}

package com.upb.projecttwo.controller;

import com.upb.projecttwo.models.Employee;
import com.upb.projecttwo.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    @Qualifier("employeeServiceImpl")
    private EmployeeService employeeService;

    @PostMapping
    public Employee save(@RequestBody Employee employee) {
        return employeeService.save(employee);
    }

    @GetMapping()
    public List<Employee> getAll(){
        return employeeService.getEmployees();
    }
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable String id) {
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable String id, @RequestBody Employee employee){
        return  employeeService.updateEmployee(id, employee);
    }
    @DeleteMapping("/{id}")
    public boolean deleteEmployee(@PathVariable String id) {
        return employeeService.deleteEmployee(id);
    }
}

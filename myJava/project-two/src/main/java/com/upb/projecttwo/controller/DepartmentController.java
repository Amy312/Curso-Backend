package com.upb.projecttwo.controller;

import com.upb.projecttwo.models.Deparment;
import com.upb.projecttwo.models.Employee;
import com.upb.projecttwo.services.DepartmentService;
import com.upb.projecttwo.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deparments")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @PostMapping
    public Deparment save(@RequestBody Deparment deparment) {
        return departmentService.save(deparment);
    }

    @GetMapping()
    public List<Deparment> getAll(){
        return departmentService.getDepartments();
    }
    @GetMapping("/{id}")
    public Deparment getEmployeeById(@PathVariable String id) {
        return departmentService.getDepartmentById(id);
    }

    @DeleteMapping("/{id}")
    public Deparment deleteEmployee(@PathVariable String id) {
        return departmentService.deleteDeparment(id);
    }
}

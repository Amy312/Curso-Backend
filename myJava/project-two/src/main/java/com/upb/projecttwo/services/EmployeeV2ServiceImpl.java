package com.upb.projecttwo.services;

import com.upb.projecttwo.entity.EmployeeEntity;
import com.upb.projecttwo.models.Employee;
import com.upb.projecttwo.repository.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EmployeeV2ServiceImpl implements EmployeeService{
    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public Employee save(Employee employee) {
        if(employee.getEmployeId() == null) {
            employee.setEmployeId(UUID.randomUUID().toString());
        }
        EmployeeEntity entity = new EmployeeEntity();
        BeanUtils.copyProperties(employee,entity);
        employeeRepository.save(entity);
        return employee;
    }

    @Override
    public Employee getEmployeeById(String id) {
        EmployeeEntity employeeEntity =
                this.employeeRepository.findById(id).get();
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeEntity, employee);
        return employee;
    }

    @Override
    public List<Employee> getEmployees() {
        List<EmployeeEntity> employeeEntities = this.employeeRepository.findAll();
        List<Employee> employeeList = employeeEntities
                .stream()
                .map(employeeEntity -> {
                    Employee employee = new Employee();
                    BeanUtils.copyProperties(employeeEntity, employee);
                    return employee;
                }).collect(Collectors.toList());
        return employeeList;
    }

    @Override
    public boolean deleteEmployee(String id) {
        this.employeeRepository.deleteById(id);
        return true;
    }

    @Override
    public Employee updateEmployee(String id, Employee employee) {
        EmployeeEntity employeeEntity =
                this.employeeRepository.findById(id).get();
        BeanUtils.copyProperties(employeeEntity, employee);
        return employee;
    }
}

package com.upb.projecttwo.services;

import com.upb.projecttwo.error.EmployeeNotFoundException;
import com.upb.projecttwo.models.Deparment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DepartmentServiceImpl implements DepartmentService{

    List<Deparment> deparmentList = new ArrayList<>();
    @Override
    public Deparment save(Deparment deparment) {
        if(deparment.getId() == null){
            deparment.setId(UUID.randomUUID().toString());
        }
        deparmentList.add(deparment);
        return deparment;
    }

    @Override
    public Deparment getDepartmentById(String id) {
        return deparmentList
                .stream()
                .filter(deparment -> deparment.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElseThrow(() -> new EmployeeNotFoundException(" "+ "Department not found with ID "+id));
    }

    @Override
    public List<Deparment> getDepartments() {
        return deparmentList;
    }

    @Override
    public Deparment deleteDeparment(String id) {
        Deparment deleted= deparmentList
                .stream()
                .filter(deparment -> deparment.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElseThrow(() -> new EmployeeNotFoundException(" "+ "Department not found with ID "+id));
        deparmentList.remove(deleted);
        return deleted;
    }
}

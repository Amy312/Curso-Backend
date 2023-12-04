package com.upb.projecttwo.services;

import com.upb.projecttwo.models.Deparment;

import java.util.List;

public interface DepartmentService {
    Deparment save(Deparment deparment);
    Deparment getDepartmentById(String id);
    List<Deparment> getDepartments();
    Deparment deleteDeparment(String id);
}

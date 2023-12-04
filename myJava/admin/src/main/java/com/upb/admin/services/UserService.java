package com.upb.admin.services;

import com.upb.admin.models.User;

import java.util.List;

public interface UserService {
    User save(User user);
    User getUserById(String id);
    List<User> getUsers();
    User deleteUser(String id);
}

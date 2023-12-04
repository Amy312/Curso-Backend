package com.library.auth.services;


import com.library.auth.model.User;

import java.util.List;

public interface UserService {
    User save(User user);
    User getUserById(String id);
    List<User> getUsers();
    User deleteUser(String id);
}

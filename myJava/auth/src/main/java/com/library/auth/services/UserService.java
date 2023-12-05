package com.library.auth.services;


import com.library.auth.model.User;

import java.util.List;

public interface UserService {
    String login(User user);
    String logout(User user);
}

package com.upb.admin.controller;

import com.upb.admin.models.User;
import com.upb.admin.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Qualifier("userServiceImpl")
    @Autowired
    private UserService userService;

    @PostMapping
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping()
    public List<User> getAll(){
        return userService.getUsers();
    }
    @GetMapping("/{id}")
    public User getEmployeeById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    public User deleteEmployee(@PathVariable String id) {
        return userService.deleteUser(id);
    }
}

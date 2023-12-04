package com.upb.admin.services;

import com.upb.admin.entity.UserEntity;
import com.upb.admin.error.EmployeeNotFoundException;
import com.upb.admin.models.User;

import com.upb.admin.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public User save(User user) {
        if(user.getId() == null){
            user.setId(UUID.randomUUID().toString());
        }
        UserEntity entity = new UserEntity();
        BeanUtils.copyProperties(user, entity);
        userRepository.save(entity);
        return user;
    }

    @Override
    public User getUserById(String id) {
//        return userList
//                .stream()
//                .filter(deparment -> deparment.getId().equalsIgnoreCase(id))
//                .findFirst()
//                .orElseThrow(() -> new EmployeeNotFoundException(" "+ "User not found with ID "+id));
        return null;
    }

    @Override
    public List<User> getUsers() {
        return null;
    }

    @Override
    public User deleteUser(String id) {
//        User deleted= userList
//                .stream()
//                .filter(deparment -> deparment.getId().equalsIgnoreCase(id))
//                .findFirst()
//                .orElseThrow(() -> new EmployeeNotFoundException(" "+ "User not found with ID "+id));
//        userList.remove(deleted);
       return null;
    }

}

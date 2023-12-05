package com.library.auth.services;


import com.library.auth.entity.UserEntity;
import com.library.auth.model.User;
import com.library.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String login(User user) {
        String theUsername = user.getUsername();
        String thePassword = user.getPassword();

        Optional<UserEntity> userEntityOptional = this.userRepository.findByUsername(theUsername);
        if(userEntityOptional.isPresent()){
            UserEntity userEntity = userEntityOptional.get();
            System.out.println(userEntity);
            if(userEntity.getPassword().equals(thePassword)){
                return "login exitoso para el usuario " + theUsername;
            }
        }
        return "El usuario y/o la contraseña no son válidos";


    }

    @Override
    public String logout(User user) {
        Optional<UserEntity> userEntityOptional = this.userRepository.findByUsername(user.getUsername());
        if(userEntityOptional.isPresent()){
            UserEntity userEntity = userEntityOptional.get();
            System.out.println(userEntity);
                return "Cerro sesión el usuario " + user.getUsername();
        }
        return "El usuario no es válido";
    }
}

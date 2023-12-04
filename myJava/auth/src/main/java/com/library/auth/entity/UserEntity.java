package com.library.auth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.lang.annotation.Target;

@Entity
@Table(name = "User")
public class UserEntity {

    private String id;
    private String username;
    private String password;
    private String roles;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}

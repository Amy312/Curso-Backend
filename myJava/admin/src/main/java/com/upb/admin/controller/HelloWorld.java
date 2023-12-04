package com.upb.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class HelloWorld {
    @GetMapping(value ="/hello/{id}/{apellido}" )
    public String hello(@PathVariable String id, @PathVariable String apellido){
        return "Hola " + id + " " + apellido;
    }

    @GetMapping("/getEmail")
    public String user(@RequestParam String nombre, @RequestParam(name = "email", required = false) String email){
        return "el correo de " + nombre + " es: " + email;
    }
}


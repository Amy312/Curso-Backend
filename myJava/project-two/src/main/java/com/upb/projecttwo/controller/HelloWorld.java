package com.upb.projecttwo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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


package com.fabulary.email.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @GetMapping("/api/v1/email/test")
    public String test() {
        return "email-service OK";
    }
}
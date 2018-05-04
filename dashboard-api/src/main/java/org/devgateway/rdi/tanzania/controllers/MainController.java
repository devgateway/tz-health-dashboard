package org.devgateway.rdi.tanzania.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Sebastian Dimunzio
 */
@RestController
public class MainController {


    @RequestMapping(value = "/hello")
    public String home(){

        return "Hello RDI Tanzania";
    }
}

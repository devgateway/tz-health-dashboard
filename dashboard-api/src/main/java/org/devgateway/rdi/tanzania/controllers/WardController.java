package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.exception.RecordNotFoundException;
import org.devgateway.rdi.tanzania.services.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Sebastian Dimunzio
 */
@RestController
@CrossOrigin("http://localhost:3000")
public class WardController {


    @Autowired
    WardService wardService;

    @RequestMapping("/wards/{id}")
    public ResponseEntity<Ward> getWard(@PathVariable Long id) {
        Ward ward = wardService.getWardById(id);

        if (ward != null) {
            return new ResponseEntity<Ward>(ward, HttpStatus.OK);

        } else return new ResponseEntity<Ward>(HttpStatus.NOT_FOUND);

    }
}

package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.services.FacilityService;
import org.devgateway.rdi.tanzania.services.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@Controller
public class WardController {

    @Autowired
    FacilityService facilityService;

    @Autowired
    WardService wardService;

    @RequestMapping("/wards/{id}/population")
    public ResponseEntity<List<Facility>> getWardFacilitiies(@PathVariable Long id) {
        Ward ward = wardService.getWardById(id);
        if (ward != null) {
            facilityService.getFacilityByWard(ward);
            return null;
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}

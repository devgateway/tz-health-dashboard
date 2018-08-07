package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.domain.orgs.Facility;
import org.devgateway.rdi.tanzania.request.FacilityRequest;
import org.devgateway.rdi.tanzania.services.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@RestController
@CrossOrigin("http://localhost:3000")
public class FacilityController {

    @Autowired
    FacilityService facilityService;

    @RequestMapping("/facilities")
    public List<Facility> getFacility(FacilityRequest facilityRequest) {
        return facilityService.getFacilities(facilityRequest);

    }

    @RequestMapping("/facilities/{id}")
    public Facility getFacility(@PathVariable Long id) {
        return facilityService.getFacility(id);
    }

}

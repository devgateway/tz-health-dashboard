package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.ServiceAreaPopulation;
import org.devgateway.rdi.tanzania.request.FacilityRequest;
import org.devgateway.rdi.tanzania.response.FacilityResponse;
import org.devgateway.rdi.tanzania.response.ResponseUtils;
import org.devgateway.rdi.tanzania.services.FacilityService;
import org.devgateway.rdi.tanzania.services.PopulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public FacilityResponse getFacility(@PathVariable Long id) {
        return ResponseUtils.facilityToResponse(facilityService.getFacility(id));
    }

    @Autowired
    PopulationService populationService;

    @RequestMapping("/facilities/{id}/population")
    public List<ServiceAreaPopulation> serviceAreaPopulations(@PathVariable Long id, @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year) {
        return populationService.getServiceAreaPopulation(id, year);
    }
}

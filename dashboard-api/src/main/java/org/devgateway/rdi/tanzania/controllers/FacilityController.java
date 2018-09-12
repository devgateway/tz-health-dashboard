package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.ServiceAreaPopulation;
import org.devgateway.rdi.tanzania.request.FacilityRequest;
import org.devgateway.rdi.tanzania.response.FacilityResponse;
import org.devgateway.rdi.tanzania.response.OPDByAgeResponse;
import org.devgateway.rdi.tanzania.response.ResponseUtils;
import org.devgateway.rdi.tanzania.services.FacilityService;
import org.devgateway.rdi.tanzania.services.OPDDiagnosesService;
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

    @Autowired
    OPDDiagnosesService opdDiagnosesService;

    @RequestMapping("/facilities")
    public List<Facility> getFacility(FacilityRequest facilityRequest) {
        return facilityService.getFacilities(facilityRequest);
    }


    @RequestMapping("/facilities/{id}")
    public FacilityResponse getFacility(@PathVariable Long id) {
        FacilityResponse facilityResponse = ResponseUtils.facilityToResponse(facilityService.getFacility(id));
        return facilityResponse;
    }

    @Autowired
    PopulationService populationService;

    @RequestMapping("/facilities/{id}/population")
    public List<ServiceAreaPopulation> serviceAreaPopulations(@PathVariable Long id, @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year) {
        return populationService.getServiceAreaPopulation(id, year);
    }


    @RequestMapping("/facilities/{id}/diagnoses")
    public List<OPDByAgeResponse> diangoses(@PathVariable Long id,
                                            @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year,
                                            @RequestParam(name = "q", required = false) Integer quarter,
                                            @RequestParam(name = "m", required = false) Integer month) {

        return opdDiagnosesService.getOPDByPeriod(id, year, quarter, month);
    }
}
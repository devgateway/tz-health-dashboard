package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.ServiceAreaPopulation;
import org.devgateway.rdi.tanzania.request.FacilityRequest;
import org.devgateway.rdi.tanzania.response.*;
import org.devgateway.rdi.tanzania.services.FacilityService;
import org.devgateway.rdi.tanzania.services.OPDDiagnosesService;
import org.devgateway.rdi.tanzania.services.PopulationService;
import org.devgateway.rdi.tanzania.services.RMNCHService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@RestController
@CrossOrigin("*")
public class FacilityController {

    @Autowired
    FacilityService facilityService;

    @Autowired
    OPDDiagnosesService opdDiagnosesService;

    @Autowired
    RMNCHService rmnchService;


    @RequestMapping("/facilities")
    public List<FacilityResponse> getFacility(FacilityRequest facilityRequest) {
        return facilityService.getFacilities(facilityRequest);
    }

    @RequestMapping("/facilities.csv")
    @ResponseBody
    public void getFacilityAsCSV(HttpServletResponse response, FacilityRequest facilityRequest) throws IOException {

        List<FacilityResponse> facilities = facilityService.getFacilities(facilityRequest);

        String csvFileName = "facilities.csv";
        response.setContentType("text/csv");
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"", csvFileName);
        response.setHeader(headerKey, headerValue);

        WriteCsvToResponse.writeFacilitiesResponse(response.getWriter(), facilities, facilityRequest.getLan());

    }


    @RequestMapping("/facilities/{id}")
    public ResponseEntity<FacilityResponse> getFacility(@PathVariable Long id) {
        FacilityResponse facilityResponse = ResponseUtils.facilityToResponse(facilityService.getFacility(id));
        if (facilityResponse != null) {
            return new ResponseEntity(facilityResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @Autowired
    PopulationService populationService;

    @RequestMapping("/facilities/{id}/population")
    public List<ServiceAreaPopulation> serviceAreaPopulations(@PathVariable Long id, @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year) {
        return populationService.getServiceAreaPopulation(id, year);
    }


    @RequestMapping("/facilities/{id}/diagnoses")
    public ResponseEntity<List<OPDByAgeResponse>> diangoses(@PathVariable Long id,
                                                            @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year,
                                                            @RequestParam(name = "q", required = false) Integer quarter,
                                                            @RequestParam(name = "m", required = false) Integer month) {
        Facility f = facilityService.getFacility(id);
        if (f == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            List<OPDByAgeResponse> opdByAgeResponses = opdDiagnosesService.getOPDByFacilityAndPeriod(f, year, quarter, month);
            return new ResponseEntity<List<OPDByAgeResponse>>(opdByAgeResponses, HttpStatus.OK);
        }
    }


    @RequestMapping(value = "/facilities/{id}/diagnoses.csv", produces = "text/csv")
    @ResponseBody
    public void diangosesAsCsv(HttpServletResponse response, @PathVariable Long id,
                               @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year,
                               @RequestParam(name = "q", required = false) Integer quarter,
                               @RequestParam(name = "m", required = false) Integer month,
                               @RequestParam(name = "lan", required = false) String lan) throws IOException {
        Facility f = facilityService.getFacility(id);
        String csvFileName = f.getName() + "_diagnoses.csv";
        response.setContentType("text/csv");
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"", csvFileName);
        response.setHeader(headerKey, headerValue);
        List<OPDByAgeResponse> opdByAgeResponses = opdDiagnosesService.getOPDByFacilityAndPeriod(f, year, quarter, month);
        WriteCsvToResponse.writeOPDResponse(response.getWriter(), opdByAgeResponses, lan);

    }


    @RequestMapping("/facilities/{id}/rmnch")
    public ResponseEntity<List<RMNCHResponse>> rmnch(@PathVariable Long id,
                                                     @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year,
                                                     @RequestParam(name = "q", required = false) Integer quarter,
                                                     @RequestParam(name = "m", required = false) Integer month) {
        Facility f = facilityService.getFacility(id);
        if (f == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            List<RMNCHResponse> rmnchByAgeResponses = rmnchService.getRMNCHbyFacilityAndPeriod(f, year, quarter, month);
            return new ResponseEntity<List<RMNCHResponse>>(rmnchByAgeResponses, HttpStatus.OK);
        }


    }

    @RequestMapping("/facilities/{id}/rmnch.csv")
    public void rmnchAsCSV(HttpServletResponse response, @PathVariable Long id,
                           @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year,
                           @RequestParam(name = "q", required = false) Integer quarter,
                           @RequestParam(name = "m", required = false) Integer month,
                           @RequestParam(name = "lan", required = false) String lan) throws IOException {
        Facility f = facilityService.getFacility(id);
        String csvFileName = f.getName() + "_rmnch.csv";
        response.setContentType("text/csv");
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"", csvFileName);
        response.setHeader(headerKey, headerValue);
        List<RMNCHResponse> rmnchByAgeResponses = rmnchService.getRMNCHbyFacilityAndPeriod(f, year, quarter, month);
        WriteCsvToResponse.writeRMNCHResponse(response.getWriter(), rmnchByAgeResponses, lan);

    }


}
package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.response.*;
import org.devgateway.rdi.tanzania.services.FacilityService;
import org.devgateway.rdi.tanzania.services.OPDDiagnosesService;
import org.devgateway.rdi.tanzania.services.RMNCHService;
import org.devgateway.rdi.tanzania.services.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@Controller
@CrossOrigin("*")
public class WardController {

    @Autowired
    FacilityService facilityService;

    @Autowired
    WardService wardService;

    @Autowired
    OPDDiagnosesService opdDiagnosesService;

    @Autowired
    RMNCHService rmnchService;


    @RequestMapping("/wards/find")
    public ResponseEntity<List<WardResponse>> find(String key) {
        if (key != null) {
            List<WardResponse> wards = wardService.findByKeyword(key);
            return new ResponseEntity<List<WardResponse>>(wards, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @RequestMapping("/wards/{id}")
    public ResponseEntity<WardResponse> getWard(@PathVariable Long id) {
        Ward w = wardService.getWardById(id);
        if (w != null) {
            WardResponse wardResponse = ResponseUtils.wardToResponse(w);
            return new ResponseEntity<WardResponse>(wardResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<WardResponse>(HttpStatus.NOT_FOUND);

        }
    }


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


    @RequestMapping("/wards/{id}/diagnoses")
    public ResponseEntity<List<OPDByAgeResponse>> diangoses(@PathVariable Long id,
                                                            @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year,
                                                            @RequestParam(name = "q", required = false) Integer quarter,
                                                            @RequestParam(name = "m", required = false) Integer month) {
        Ward w = wardService.getWardById(id);
        if (w == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            List<OPDByAgeResponse> opdByAgeResponses = opdDiagnosesService.getOPDByWardAndPeriod(w, year, quarter, month);
            return new ResponseEntity<List<OPDByAgeResponse>>(opdByAgeResponses, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/wards/{id}/diagnoses.csv", produces = "text/csv")
    public void diangosesAsCsv(HttpServletResponse response, @PathVariable Long id,
                               @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year,
                               @RequestParam(name = "q", required = false) Integer quarter,
                               @RequestParam(name = "m", required = false) Integer month,
                               @RequestParam(name = "lan", required = false) String lan) throws IOException {
        Ward w = wardService.getWardById(id);
        String csvFileName = w.getName() + "_diagnoses.csv";
        response.setContentType("text/csv");
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"", csvFileName);
        response.setHeader(headerKey, headerValue);
        List<OPDByAgeResponse> opdByAgeResponses = opdDiagnosesService.getOPDByWardAndPeriod(w, year, quarter, month);
        WriteCsvToResponse.writeOPDResponse(response.getWriter(), opdByAgeResponses, lan);

    }


    @RequestMapping("/wards/{id}/rmnch")
    public ResponseEntity<List<RMNCHResponse>> rmnch(@PathVariable Long id,
                                                     @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year,
                                                     @RequestParam(name = "q", required = false) Integer quarter,
                                                     @RequestParam(name = "m", required = false) Integer month) {
        Ward w = wardService.getWardById(id);
        if (w == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            List<RMNCHResponse> rmnch = rmnchService.getRMNCHbyWardAndPeriod(w, year, quarter, month);
            return new ResponseEntity<List<RMNCHResponse>>(rmnch, HttpStatus.OK);
        }


    }


    @RequestMapping("/wards/{id}/rmnch.csv")
    public void rmnchAsCSV(HttpServletResponse response, @PathVariable Long id,
                           @RequestParam(name = "y", defaultValue = "2017", required = false) Integer year,
                           @RequestParam(name = "q", required = false) Integer quarter,
                           @RequestParam(name = "m", required = false) Integer month,
                           @RequestParam(name = "lan", required = false) String lan) throws IOException {
        Ward w = wardService.getWardById(id);

        String csvFileName = w.getName() + "_rmnch.csv";
        response.setContentType("text/csv");
        String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"", csvFileName);
        response.setHeader(headerKey, headerValue);
        List<RMNCHResponse> rmnchByAgeResponses = rmnchService.getRMNCHbyWardAndPeriod(w, year, quarter, month);

        WriteCsvToResponse.writeRMNCHResponse(response.getWriter(), rmnchByAgeResponses,lan);


    }
}

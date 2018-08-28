package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.repositories.OPDDiagnosticRepository;
import org.devgateway.rdi.tanzania.response.OPDResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class OPDDiagnosesService {
    @Autowired
    OPDDiagnosticRepository opdDiagnosticRepository;

    @Autowired
    FacilityService facilityService;


    public List<OPDResponse> getByYear(Long id, Integer year) {

        Facility f = facilityService.getFacility(id);
        List<OPDResponse> opdResponses = opdDiagnosticRepository.getAllYearly(f, year);
        return opdResponses;

    }
}

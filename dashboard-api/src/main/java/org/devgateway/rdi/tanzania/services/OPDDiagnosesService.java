package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.repositories.OPDDiagnosticRepository;
import org.devgateway.rdi.tanzania.response.OPDByAgeResponse;
import org.devgateway.rdi.tanzania.response.OPDResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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


    public List<OPDByAgeResponse> getByYear(Long id, Integer year) {

        Facility f = facilityService.getFacility(id);

        List<Long> ids = opdDiagnosticRepository.getTopDiseasesByYear(f, year);

        List<OPDResponse> yearlyByAge = opdDiagnosticRepository.getYearlyByAge(f, year, ids);


        List<OPDByAgeResponse> results = new ArrayList<>();

        if (yearlyByAge != null) {
            Long current = null;
            OPDByAgeResponse opdByAgeResponse = null;

            for (OPDResponse opd : yearlyByAge) {
                if (current != opd.getDiagnostic().getId()) {
                    current = opd.getDiagnostic().getId();
                    opdByAgeResponse = new OPDByAgeResponse();
                    opdByAgeResponse.setDiagnostic(opd.getDiagnostic());
                    opdByAgeResponse.setYear(opd.getYear());
                    results.add(opdByAgeResponse);
                }
                opdByAgeResponse.setTotalPrevPeriod(opdDiagnosticRepository.getYearlyTotalByDiagnostic(f, year - 1, opd.getDiagnostic()));
                opdByAgeResponse.addValue(opd.getAge(), opd.getValue());


            }
        }

        return results;

    }


}

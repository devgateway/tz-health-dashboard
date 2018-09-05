package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.repositories.OPDDiagnosticRepository;
import org.devgateway.rdi.tanzania.response.OPDByAgeResponse;
import org.devgateway.rdi.tanzania.response.OPDResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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


       List<OPDResponse> prevValues= opdDiagnosticRepository.getYearlyTotalByDiagnostic(f, year - 1, ids);

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

                //
                Optional<OPDResponse> prevYear = prevValues.stream().filter(opdByAgeResponse1 -> opdByAgeResponse1.getDiagnostic().getId().equals(opd.getDiagnostic().getId())).findAny();

                opdByAgeResponse.setTotalPrevPeriod(prevYear.isPresent() ? prevYear.get().getValue() : null);
                opdByAgeResponse.addValue(opd.getAge(), opd.getValue());


            }
        }

        return results;

    }


}

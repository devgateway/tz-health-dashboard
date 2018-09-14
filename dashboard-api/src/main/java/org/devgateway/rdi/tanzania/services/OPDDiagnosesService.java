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


    public List<OPDByAgeResponse> getOPDByPeriod(Long id, Integer year, Integer quarter, Integer month) {

        Facility f = facilityService.getFacility(id);

        List<Long> ids = opdDiagnosticRepository.getTop(f, year, quarter, month);

        List<OPDResponse> diagnosesByAge = opdDiagnosticRepository.getDiagnoses(f, year, quarter, month, ids);

        List<OPDResponse> prevValues = null;
        if (month != null) {
            Integer prevYear = year;
            Integer prevMonth = month == 1 ? 12 : month - 1;
            if (month == 1) {
                prevYear = year - 1;
            }
            prevValues = opdDiagnosticRepository.getMonthlyTotalValues(f, prevYear, prevMonth, ids);

        } else if (quarter != null) {
            Integer prevYear = year;
            Integer prevQuarter = quarter == 1 ? 3 : quarter - 1;
            if (quarter == 1) {
                prevYear = year - 1;
            }
            prevValues = opdDiagnosticRepository.getQuarterlyTotalValues(f, prevYear, prevQuarter, ids);

        } else {
            Integer prevYear = year - 1;
            prevValues = opdDiagnosticRepository.getYearlyTotalValues(f, prevYear, ids);
        }


        List<OPDByAgeResponse> results = new ArrayList<>();

        if (diagnosesByAge != null) {
            Long current = null;
            OPDByAgeResponse opdByAgeResponse = null;

            for (OPDResponse opd : diagnosesByAge) {
                if (current != opd.getDiagnostic().getId()) {
                    current = opd.getDiagnostic().getId();
                    opdByAgeResponse = new OPDByAgeResponse();
                    opdByAgeResponse.setDiagnostic(opd.getDiagnostic());
                    opdByAgeResponse.setYear(opd.getYear());
                    results.add(opdByAgeResponse);
                }


                Optional<OPDResponse> prevYear = prevValues.stream()
                        .filter(opdByAgeResponse1 -> opdByAgeResponse1.getDiagnostic()
                                .getId().equals(opd.getDiagnostic().getId()))
                        .findAny();
                opdByAgeResponse.setTotalPrevPeriod(prevYear.isPresent() ? prevYear.get().getValue() : null);

                opdByAgeResponse.addValue(opd.getAge(), opd.getValue());


            }
        }

        return results;

    }


}

package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.DataElement;
import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.repositories.OPDDiagnosticRepository;
import org.devgateway.rdi.tanzania.response.OPDByAgeResponse;
import org.devgateway.rdi.tanzania.response.OPDResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
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

    /**
     * OPD by facility and period disaggregated by age
     *
     * @param f
     * @param year
     * @param quarter
     * @param month
     * @return
     */
    public List<OPDByAgeResponse> getOPDByFacilityAndPeriod(Facility f, Integer year, Integer quarter, Integer month) {
        List<Long> ids = opdDiagnosticRepository.getTop(f, year, quarter, month);
        List<OPDResponse> diagnosesByAge = opdDiagnosticRepository.getDiagnoses(f, year, quarter, month, ids);
        List<OPDByAgeResponse> results = aggregate(f, diagnosesByAge, true);
        return results;
    }

    /**
     * Aggregate records by diagnose  and facility
     *
     * @param f
     * @param diagnose
     * @param year
     * @param quarter
     * @param month
     * @return
     */
    public List<OPDByAgeResponse> getOPDByFacilityPreviousValues(Facility f, DataElement diagnose, Integer year, Integer quarter, Integer month) {
        List<OPDResponse> prevValues = null;
        if (month != null) {
            Integer prevYear = year;
            Integer prevMonth = month == 1 ? 12 : month - 1;
            if (month == 1) {
                prevYear = year - 1;
            }
            prevValues = opdDiagnosticRepository.getDiagnoses(f, prevYear, prevMonth, null, Arrays.asList(diagnose.getId()));


        } else if (quarter != null) {
            Integer prevYear = year;
            Integer prevQuarter = quarter == 1 ? 3 : quarter - 1;
            if (quarter == 1) {
                prevYear = year - 1;
            }
            prevValues = opdDiagnosticRepository.getDiagnoses(f, prevYear, prevQuarter, null, Arrays.asList(diagnose.getId()));

        } else {
            Integer prevYear = year - 1;
            prevValues = opdDiagnosticRepository.getDiagnoses(f, prevYear, null, null, Arrays.asList(diagnose.getId()));

        }
        return aggregate(f, prevValues, false);
    }


    public List<OPDByAgeResponse> getOPDByWardPreviousValues(Ward w, DataElement diagnose, Integer year, Integer quarter, Integer month) {
        List<OPDResponse> prevValues = null;
        if (month != null) {
            Integer prevYear = year;
            Integer prevMonth = month == 1 ? 12 : month - 1;
            if (month == 1) {
                prevYear = year - 1;
            }
            prevValues = opdDiagnosticRepository.getMonthlyTotalValuesByWard(w, prevYear, prevMonth, Arrays.asList(diagnose.getId()));

        } else if (quarter != null) {
            Integer prevYear = year;
            Integer prevQuarter = quarter == 1 ? 3 : quarter - 1;
            if (quarter == 1) {
                prevYear = year - 1;
            }
            prevValues = opdDiagnosticRepository.getQuarterlyTotalValuesByWard(w, prevYear, prevQuarter, Arrays.asList(diagnose.getId()));

        } else {
            Integer prevYear = year - 1;
            prevValues = opdDiagnosticRepository.getYearlyTotalValuesByWard(w, prevYear, Arrays.asList(diagnose.getId()));
        }

        return aggregate(w, prevValues, false);
    }

    /**
     * Aggregate records by diagnose  and facility
     *
     * @param f
     * @param diagnosesByAge
     * @param includePrevValues
     * @return
     */
    public List<OPDByAgeResponse> aggregate(Facility f, List<OPDResponse> diagnosesByAge, boolean includePrevValues) {
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

                if (includePrevValues) {
                    opdByAgeResponse.setPrevValues(getOPDByFacilityPreviousValues(f, opd.getDiagnostic(), opd.getYear(), opd.getQuarter(), opd.getMonth()));
                }
                opdByAgeResponse.addValue(opd.getAge(), opd.getValue());
            }
        }

        return results;
    }

    /**
     * Aggregate records by ward  and facility
     *
     * @param w
     * @param diagnosesByAge
     * @param includePrevValues
     * @return
     */
    public List<OPDByAgeResponse> aggregate(Ward w, List<OPDResponse> diagnosesByAge, boolean includePrevValues) {
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
                    opdByAgeResponse.setMonth(opd.getMonth());
                    opdByAgeResponse.setQuarter(opd.getQuarter());
                    results.add(opdByAgeResponse);
                }
                if (includePrevValues) {
                    opdByAgeResponse.setPrevValues(getOPDByWardPreviousValues(w, opd.getDiagnostic(), opd.getYear(), opd.getQuarter(), opd.getMonth()));
                }

                opdByAgeResponse.addValue(opd.getAge(), opd.getValue());

            }
        }

        return results;
    }


    /**
     * OPD by Ward and period disaggregated by age
     *
     * @param w
     * @param year
     * @param quarter
     * @param month
     * @return
     */
    public List<OPDByAgeResponse> getOPDByWardAndPeriod(Ward w, Integer year, Integer quarter, Integer month) {
        List<Long> ids = opdDiagnosticRepository.getTopByWar(w, year, quarter, month);
        List<OPDResponse> diagnosesByAge = opdDiagnosticRepository.getDiagnosesByWard(w, year, quarter, month, ids);
        List<OPDByAgeResponse> results = aggregate(w, diagnosesByAge, true);
        return results;

    }
}

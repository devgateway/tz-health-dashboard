package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.response.OPDResponse;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public interface OPDDiagnosticRepositoryCustom {

    List<Long> getTop(Facility f, Integer year, Integer quarter, Integer month);

    List<Long> getTopByWar(Ward f, Integer year, Integer quarter, Integer month);

    List<OPDResponse> getDiagnoses(Facility f, Integer year, Integer quarter, Integer month, List<Long> ids);

    List<OPDResponse> getDiagnosesByWard(Ward w, Integer year, Integer quarter, Integer month, List<Long> ids);


    List<OPDResponse> getYearlyTotalValues(Facility f, Integer year, List<Long> ids);

    List<OPDResponse> getYearlyTotalValuesByWard(Ward w, Integer year, List<Long> ids);

    List<OPDResponse> getQuarterlyTotalValues(Facility f, Integer year, Integer quarter, List<Long> ids);

    List<OPDResponse> getQuarterlyTotalValuesByWard(Ward w, Integer year, Integer quarter, List<Long> ids);

    List<OPDResponse> getMonthlyTotalValues(Facility f, Integer year, Integer month, List<Long> ids);

    List<OPDResponse> getMonthlyTotalValuesByWard(Ward w, Integer year, Integer month, List<Long> ids);

    void deleteUsingRegion(Long id, Integer year);
}

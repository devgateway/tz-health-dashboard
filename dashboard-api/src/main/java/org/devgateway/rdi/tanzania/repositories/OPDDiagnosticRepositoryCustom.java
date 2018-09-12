package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.response.OPDResponse;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public interface OPDDiagnosticRepositoryCustom {

    List<Long> getTop(Facility f, Integer year, Integer quarter, Integer month);

    List<OPDResponse> getDiagnoses(Facility f, Integer year, Integer quarter, Integer month, List<Long> ids);


    List<OPDResponse> getYearlyTotalValues(Facility f, Integer year, List<Long> ids);

    List<OPDResponse> getQuarterlyTotalValues(Facility f, Integer year, Integer quarter, List<Long> ids);

    List<OPDResponse> getMonthlyTotalValues(Facility f, Integer year, Integer month, List<Long> ids);

}

package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.response.OPDResponse;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public interface OPDDiagnosticRepositoryCustom {

    List<Long> getTop(Facility f, Integer year, Integer quarter, Integer month);


    List<OPDResponse> getDiagnosesByAge(Facility f, Integer year, Integer quarter, Integer month, List<Long> ids);



    List<OPDResponse> getYearly(Facility f, Integer year, List<Long> ids);

    List<OPDResponse> getYearlyTotalByDiagnostic(Facility f, Integer year, List<Long> ids);

}

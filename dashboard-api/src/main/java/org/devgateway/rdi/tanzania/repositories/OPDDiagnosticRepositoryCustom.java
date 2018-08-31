package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.DataElement;
import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.response.OPDResponse;

import javax.tools.Diagnostic;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public interface OPDDiagnosticRepositoryCustom {

    List<Long> getTopDiseasesByYear(Facility f, Integer year);

    List<OPDResponse> getYearlyByAge(Facility f, Integer year, List<Long> ids);

    List<OPDResponse> getYearly(Facility f, Integer year, List<Long> ids);

    Long getYearlyTotalByDiagnostic(Facility f, Integer year, DataElement diagnostic);

}

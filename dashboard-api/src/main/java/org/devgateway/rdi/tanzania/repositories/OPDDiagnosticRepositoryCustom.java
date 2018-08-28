package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.OPDDiagnostic;
import org.devgateway.rdi.tanzania.response.OPDResponse;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public interface OPDDiagnosticRepositoryCustom {

    List<OPDResponse> getAllYearly(Facility f, Integer year);

    List<OPDResponse> getAllMonthly(Facility f, Integer year, Integer month);

}

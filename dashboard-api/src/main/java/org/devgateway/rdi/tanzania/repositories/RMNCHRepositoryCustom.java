package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.response.OPDResponse;
import org.devgateway.rdi.tanzania.response.RMNCHResponse;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public interface RMNCHRepositoryCustom {

    List<RMNCHResponse> getRMNCH(Facility f, Integer year, Integer quarter, Integer month);

}

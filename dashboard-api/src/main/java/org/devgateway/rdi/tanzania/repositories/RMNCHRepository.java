package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.OPDDiagnostic;
import org.devgateway.rdi.tanzania.domain.RMNCH;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sebastian Dimunzio
 */

public interface RMNCHRepository extends JpaRepository<RMNCH, Long>, RMNCHRepositoryCustom {


}

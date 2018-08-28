package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.OPDDiagnostic;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sebastian Dimunzio
 */

public interface OPDDiagnosticRepository extends JpaRepository<OPDDiagnostic, Long>, OPDDiagnosticRepositoryCustom {


}

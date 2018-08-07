package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Diagnostic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Sebastian Dimunzio
 */
@Repository
public interface DiagnosticRepository extends JpaRepository<Diagnostic, Long> {

}


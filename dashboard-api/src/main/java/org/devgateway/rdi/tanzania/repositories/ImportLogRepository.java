package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.ImportLog;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sebastian Dimunzio
 */
public interface ImportLogRepository extends JpaRepository<ImportLog, Long> {
}

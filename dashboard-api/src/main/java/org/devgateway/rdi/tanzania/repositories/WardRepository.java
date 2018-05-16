package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sebastian Dimunzio
 */
public interface WardRepository extends JpaRepository<Ward, Long> {
}

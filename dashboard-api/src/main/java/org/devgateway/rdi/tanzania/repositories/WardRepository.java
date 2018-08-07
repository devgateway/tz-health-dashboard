package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Sebastian Dimunzio
 */
@Repository
public interface WardRepository extends JpaRepository<Ward, Long>, WardRepositoryCustom {
}


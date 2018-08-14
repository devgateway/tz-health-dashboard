package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Dimension;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sebastian Dimunzio
 */

public interface DimensionRepository extends JpaRepository<Dimension, Long> {

    Dimension findOneByDhis2Id(String dId);

}


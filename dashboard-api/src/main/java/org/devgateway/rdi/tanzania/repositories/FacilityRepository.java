package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author Sebastian Dimunzio
 */

public interface FacilityRepository extends JpaRepository<Facility, Long>, JpaSpecificationExecutor {



    Facility findOneByDhis2Id(String dId);
}

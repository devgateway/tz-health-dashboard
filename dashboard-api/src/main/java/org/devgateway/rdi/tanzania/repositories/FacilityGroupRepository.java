package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.FacilityGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Sebastian Dimunzio
 */

@Repository
public interface FacilityGroupRepository extends JpaRepository<FacilityGroup, Long> {

    public FacilityGroup findOneByDhis2Id(String dId);
}

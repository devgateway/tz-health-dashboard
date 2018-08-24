package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Region;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Sebastian Dimunzio
 */

@Repository
public interface RegionRepository extends JpaRepository<Region, Long>, RegionRepositoryCustom {

    @EntityGraph(value = "districtsJoin", type = EntityGraph.EntityGraphType.FETCH)
    Region findOneByName(String name);


}

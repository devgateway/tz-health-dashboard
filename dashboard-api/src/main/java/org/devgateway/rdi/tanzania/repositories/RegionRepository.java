package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Boundary;
import org.devgateway.rdi.tanzania.domain.Region;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Repository
public interface RegionRepository extends JpaRepository<Region,Long> {
    List<Region> findAll(Specification<Region> spec);

    Region findOneByName(String name);


}

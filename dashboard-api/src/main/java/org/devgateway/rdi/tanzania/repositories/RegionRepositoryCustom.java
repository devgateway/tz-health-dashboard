package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.Region;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */


public interface RegionRepositoryCustom {

    List<Region> findAll(Specification<Region> specification, Double simplifyFactor);

}

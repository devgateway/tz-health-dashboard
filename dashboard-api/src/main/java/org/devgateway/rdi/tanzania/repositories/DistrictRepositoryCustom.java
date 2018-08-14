package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.District;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */


public interface DistrictRepositoryCustom {

    List<District> findAll(Specification<District> specification, Double simplifyFactor);

}

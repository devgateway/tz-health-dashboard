package org.devgateway.rdi.tanzania.repositories;

import com.vividsolutions.jts.geom.Point;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
public interface WardRepositoryCustom {

    Ward findWardByPoint(Point point);

    List<Ward> findAll(Specification<Ward> specification, Double simplifyFactor);

}

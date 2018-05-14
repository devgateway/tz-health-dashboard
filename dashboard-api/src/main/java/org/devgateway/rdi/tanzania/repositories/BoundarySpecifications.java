package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.request.BoundaryRequest;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class BoundarySpecifications {


    public static Specification<District> getDistricSpecifications(BoundaryRequest boundaryRequest) {
        return new Specification<District>() {
            @Override
            public Predicate toPredicate(Root<District> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicates = new ArrayList<>();
                if (boundaryRequest.getQ() != null) {
                    predicates.add(criteriaBuilder.like(root.get(Boundary_.name), boundaryRequest.getQ()));
                }

                if (predicates.size() > 0) {
                    return criteriaBuilder.and((Predicate[]) predicates.toArray(new Predicate[predicates.size()]));
                } else {
                    return null;
                }
            }
        };
    }


    public static Specification<Ward> getWardSpecifications(BoundaryRequest boundaryRequest) {
        return new Specification<Ward>() {
            @Override
            public Predicate toPredicate(Root<Ward> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicates = new ArrayList<>();
                if (boundaryRequest.getQ() != null) {
                    predicates.add(criteriaBuilder.like(root.get(Boundary_.name), boundaryRequest.getQ()));
                }

                if (boundaryRequest.getDistrictId() != null) {
                    predicates.add(criteriaBuilder.equal(root.get(Ward_.district), boundaryRequest.getDistrictId()));
                }

                if (predicates.size() > 0) {
                    return criteriaBuilder.and((Predicate[]) predicates.toArray(new Predicate[predicates.size()]));
                } else {
                    return null;
                }
            }
        };
    }


}

package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.request.BoundaryRequest;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class BoundarySpecifications {


    public static Specification<Region> getRegionSpecifications(BoundaryRequest boundaryRequest) {
        return new Specification<Region>() {
            @Override
            public Predicate toPredicate(Root<Region> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicates = new ArrayList<>();

                if (boundaryRequest.getRegions() != null) {
                    predicates.add((root.get(Region_.gid).in(boundaryRequest.getRegions())));
                }

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


    public static Specification<District> getDistricSpecifications(BoundaryRequest boundaryRequest) {
        return new Specification<District>() {
            @Override
            public Predicate toPredicate(Root<District> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicates = new ArrayList<>();
                if (boundaryRequest.getQ() != null) {
                    predicates.add(criteriaBuilder.like(root.get(Boundary_.name), boundaryRequest.getQ()));
                }

                if (boundaryRequest.getRegions() != null) {
                    Join<District, Region> districtRegionJoin = root.join(District_.region);
                    predicates.add(districtRegionJoin.get(Region_.gid).in(boundaryRequest.getRegions()));
                }

                if (boundaryRequest.getDistricts() != null) {
                    predicates.add(root.get(District_.gid).in(boundaryRequest.getDistricts()));
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

                if (boundaryRequest.getRegions() != null) {
                    Join<Ward, District> districtJoin = root.join(Ward_.district);
                    Join<District, Region> regionJoin = districtJoin.join(District_.region);
                    predicates.add(regionJoin.get(Region_.gid).in(boundaryRequest.getRegions()));
                }

                if (boundaryRequest.getDistricts() != null) {
                    predicates.add(root.get(Ward_.district).in(boundaryRequest.getDistricts()));
                }


                if (boundaryRequest.getWards() != null) {
                    predicates.add(root.get(Ward_.gid).in(boundaryRequest.getWards()));
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

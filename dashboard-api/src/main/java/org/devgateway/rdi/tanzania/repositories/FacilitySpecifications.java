package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.request.FacilityRequest;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class FacilitySpecifications {


    public static Specification<Facility> facilityFilters(FacilityRequest facilityRequest) {
        return new Specification<Facility>() {
            @Override
            public Predicate toPredicate(Root<Facility> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicates = new ArrayList<>();

                if (facilityRequest.getTypes() != null && facilityRequest.getTypes().size() > 0) {
                    predicates.add(root.get(Facility_.type).in(facilityRequest.getTypes()));
                }


                if (facilityRequest.getWards() != null && facilityRequest.getWards().size() > 0) {
                    predicates.add(root.get(Facility_.ward).in(facilityRequest.getWards()));
                }

                if (facilityRequest.getDistricts() != null && facilityRequest.getDistricts().size() > 0) {
                    Join<Facility, Ward> wardJoin = root.join(Facility_.ward);
                    Join<Ward, District> districtJoin = wardJoin.join(Ward_.district);
                    predicates.add(districtJoin.get(District_.gid).in(facilityRequest.getDistricts()));
                }
                if (facilityRequest.getRegions() != null && facilityRequest.getRegions().size() > 0) {
                    Join<Facility, Ward> wardJoin = root.join(Facility_.ward);
                    Join<Ward, District> districtJoin = wardJoin.join(Ward_.district);
                    Join<District, Region> regionJoin = districtJoin.join(District_.region);
                    predicates.add(regionJoin.get(Region_.gid).in(facilityRequest.getRegions()));
                }

                if (facilityRequest.getKeyWord() != null && !facilityRequest.getKeyWord().isEmpty()) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.upper(root.get(Facility_.name)),
                            facilityRequest.getKeyWord().toUpperCase() + "%"));
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

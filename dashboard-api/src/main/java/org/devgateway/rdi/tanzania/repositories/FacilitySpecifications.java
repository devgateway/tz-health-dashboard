package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.Facility_;
import org.devgateway.rdi.tanzania.request.FacilityRequest;
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

public class FacilitySpecifications {


    public static Specification<Facility> facilityByWard(FacilityRequest facilityRequest) {
        return new Specification<Facility>() {
            @Override
            public Predicate toPredicate(Root<Facility> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicates = new ArrayList<>();

                if (facilityRequest.getDistricts() != null && facilityRequest.getDistricts().size() > 0) {

                    //predicates.add(root.get(Facility_.ward).in(facilityRequest.getWards()));
                }


                if (facilityRequest.getWards() != null && facilityRequest.getWards().size() > 0) {

                    predicates.add(root.get(Facility_.ward).in(facilityRequest.getWards()));
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

package org.devgateway.rdi.tanzania.repositories;

import com.vividsolutions.jts.geom.Geometry;
import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.District_;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.domain.Ward_;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Repository
public class WardGeoRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Ward> findAll(Specification<Ward> specification, Double simplifyFactor) {

        List<Selection<?>> multiSelect = new ArrayList<>();
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery criteriaQuery = em.getCriteriaBuilder().createQuery(Ward.class);

        Root<Ward> root = criteriaQuery.from(Ward.class);

        ParameterExpression<Double> factorParam = criteriaBuilder.parameter(Double.class, "factor");
        Expression function = criteriaBuilder.function("simplifyPreserve", Geometry.class, root.get(Ward_.geom), factorParam);

        multiSelect.add(root.get(Ward_.gid));
        multiSelect.add(function);
        multiSelect.add(root.get(Ward_.name));


        Predicate predicate = specification.toPredicate(root, criteriaQuery, criteriaBuilder);
        if (predicate != null) {
            criteriaQuery.where(predicate);
        }

        TypedQuery<Ward> query = em.createQuery(criteriaQuery.multiselect(multiSelect));
        query.setParameter("factor", simplifyFactor);

        return query.getResultList();
    }


}

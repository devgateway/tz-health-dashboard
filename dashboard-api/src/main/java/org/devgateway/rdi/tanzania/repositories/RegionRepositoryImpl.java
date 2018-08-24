package org.devgateway.rdi.tanzania.repositories;

import com.vividsolutions.jts.geom.Geometry;
import org.devgateway.rdi.tanzania.domain.District_;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.domain.Region_;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */


public class RegionRepositoryImpl implements RegionRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    public List<Region> findAll(Specification<Region> specification, Double simplifyFactor) {
        List<Selection<?>> multiSelect = new ArrayList<>();
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery criteriaQuery = em.getCriteriaBuilder().createQuery(Region.class);

        Root<Region> root = criteriaQuery.from(Region.class);

        ParameterExpression<Double> factorParam = criteriaBuilder.parameter(Double.class, "factor");
        Expression function = criteriaBuilder.function("simplifyPreserve", Geometry.class, root.get(Region_.geom), factorParam);

        multiSelect.add(root.get(District_.gid));
        multiSelect.add(function);
        multiSelect.add(root.get(District_.name));


        Predicate predicate = specification.toPredicate(root, criteriaQuery, criteriaBuilder);
        if (predicate != null) {
            criteriaQuery.where(predicate);
        }

        TypedQuery<Region> query = em.createQuery(criteriaQuery.multiselect(multiSelect));
        query.setParameter("factor", simplifyFactor);
        return query.getResultList();
    }


}

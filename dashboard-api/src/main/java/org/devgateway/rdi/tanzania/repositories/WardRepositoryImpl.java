package org.devgateway.rdi.tanzania.repositories;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.Point;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.domain.Ward_;
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


public class WardRepositoryImpl implements WardRepositoryCustom {

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
        multiSelect.add(root.get(Ward_.population));
        multiSelect.add(root.get(Ward_.populationMale));
        multiSelect.add(root.get(Ward_.populationFemale));

        Predicate predicate = specification.toPredicate(root, criteriaQuery, criteriaBuilder);
        if (predicate != null) {
            criteriaQuery.where(predicate);
        }

        TypedQuery<Ward> query = em.createQuery(criteriaQuery.multiselect(multiSelect));
        query.setParameter("factor", simplifyFactor);

        return query.getResultList();
    }


    public Ward findWardByPoint(Point point) {

        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery criteriaQuery = em.getCriteriaBuilder().createQuery(Ward.class);

        Root<Ward> root = criteriaQuery.from(Ward.class);

        ParameterExpression<Point> geometryParam = criteriaBuilder.parameter(Point.class, "point");

        Expression function = criteriaBuilder.function("ST_Contains", Boolean.class, root.get(Ward_.geom), geometryParam);

        criteriaQuery.where(criteriaBuilder.isTrue(function));
        TypedQuery<Ward> q = em.createQuery(criteriaQuery);

        q.setParameter(geometryParam, point);

        List<Ward> wards = q.getResultList();

        if (wards.size() > 0) {
            return wards.iterator().next();
        } else {
            return null;
        }
    }


}

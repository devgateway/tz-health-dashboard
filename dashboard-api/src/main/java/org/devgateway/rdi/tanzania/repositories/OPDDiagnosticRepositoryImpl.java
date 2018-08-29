package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.response.OPDResponse;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class OPDDiagnosticRepositoryImpl implements OPDDiagnosticRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    public List<Long> ids(Facility f, Integer year) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<OPDDiagnostic> from = query.from(OPDDiagnostic.class);
        Join<OPDDiagnostic, DataElement> queryJoin = from.join(OPDDiagnostic_.diagnostic);


        query.select(queryJoin.get(DataElement_.id));

        query.groupBy(
                queryJoin.get(DataElement_.id),
                from.get(OPDDiagnostic_.year));

        List<Predicate> queryFilter = new ArrayList();
        queryFilter.add(cb.equal(from.get(OPDDiagnostic_.facility), f));
        queryFilter.add(cb.equal(from.get(OPDDiagnostic_.year), year));

        query.orderBy(cb.desc(cb.sum(from.get(OPDDiagnostic_.value))));

        query.where(cb.and(queryFilter.toArray(new Predicate[queryFilter.size()])));

        return em.createQuery(query).setMaxResults(10).getResultList();

    }


    public List<OPDResponse> getAllYearly(Facility f, Integer year) {

        List<Long> ids = ids(f, year);

        if (ids.size() > 0) {
            //QUERY
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<OPDResponse> query = cb.createQuery(OPDResponse.class);
            Root<OPDDiagnostic> from = query.from(OPDDiagnostic.class);
            Join<OPDDiagnostic, DataElement> queryJoin = from.join(OPDDiagnostic_.diagnostic);


            query.multiselect(
                    from.get(OPDDiagnostic_.diagnostic),
                    from.get(OPDDiagnostic_.age),
                    from.get(OPDDiagnostic_.year),
                    cb.sum(from.get(OPDDiagnostic_.value)));

            query.groupBy(
                    from.get(OPDDiagnostic_.diagnostic),
                    from.get(OPDDiagnostic_.age),
                    from.get(OPDDiagnostic_.year));


            List<Predicate> queryFilter = new ArrayList();
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.facility), f));
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.year), year));
            queryFilter.add(queryJoin.get(DataElement_.id).in(ids));

            query.where(cb.and(queryFilter.toArray(new Predicate[queryFilter.size()])));
            return em.createQuery(query).getResultList();
        } else {
            return null;
        }
    }

    @Override
    public List<OPDResponse> getAllMonthly(Facility f, Integer year, Integer month) {
        return null;
    }
}

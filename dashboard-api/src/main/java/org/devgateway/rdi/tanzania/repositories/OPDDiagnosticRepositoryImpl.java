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

    /*
    returns top 10 OPD ids which is used to filter the main queries
     */
    public List<Long> getTop(Facility f, Integer year, Integer quarter, Integer month) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<OPDDiagnostic> from = query.from(OPDDiagnostic.class);
        Join<OPDDiagnostic, DataElement> queryJoin = from.join(OPDDiagnostic_.diagnostic);


        query.select(queryJoin.get(DataElement_.id));


        List<Expression> group = new ArrayList();
        List<Predicate> queryFilter = new ArrayList();

        group.add(queryJoin.get(DataElement_.id));
        group.add(from.get(OPDDiagnostic_.year));

        queryFilter.add(cb.equal(from.get(OPDDiagnostic_.facility), f));
        queryFilter.add(cb.equal(from.get(OPDDiagnostic_.year), year));


        if (month != null) {
            group.add(from.get(OPDDiagnostic_.month));
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.month), month));
        }

        if (quarter != null) {
            group.add(from.get(OPDDiagnostic_.quarter));
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.quarter), quarter));
        }


        query.groupBy(group.toArray(group.toArray(new Expression[group.size()])));


        //The following elements should be excluded
        //"Yut5amdi7iw";"Attendance"
        //"KlePTLpBdWd";"Mudhurio ya Marudio Katika OPD"
        //"uyQpafHrxLT";"Mara ya Kwanza Kuhudhuria OPD Mwaka Huu "
        queryFilter.add(cb.not(queryJoin.get(DataElement_.dhis2Id).in("Yut5amdi7iw", "KlePTLpBdWd", "uyQpafHrxLT")));


        query.orderBy(cb.desc(cb.sum(from.get(OPDDiagnostic_.value))));

        query.where(cb.and(queryFilter.toArray(new Predicate[queryFilter.size()])));

        return em.createQuery(query).setMaxResults(10).getResultList();

    }


    /*
       Returns diagnoses filtered by ids aggregated yearly, or quarterly or monthly
    */
    public List<OPDResponse> getDiagnoses(Facility f, Integer year, Integer quarter, Integer month, List<Long> ids) {


        if (ids.size() > 0) {
            //QUERY
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<OPDResponse> query = cb.createQuery(OPDResponse.class);
            Root<OPDDiagnostic> from = query.from(OPDDiagnostic.class);
            Join<OPDDiagnostic, DataElement> queryJoin = from.join(OPDDiagnostic_.diagnostic);

            List<Expression> selection = new ArrayList();
            List<Expression> group = new ArrayList();

            List<Predicate> queryFilter = new ArrayList();
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.facility), f));
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.year), year));
            queryFilter.add(queryJoin.get(DataElement_.id).in(ids));


            selection.add(from.get(OPDDiagnostic_.diagnostic));
            selection.add(from.get(OPDDiagnostic_.age));
            selection.add(from.get(OPDDiagnostic_.year));

            group.add(from.get(OPDDiagnostic_.diagnostic));
            group.add(from.get(OPDDiagnostic_.age));
            group.add(from.get(OPDDiagnostic_.year));

            if (quarter != null) {
                selection.add(from.get(OPDDiagnostic_.quarter));
                queryFilter.add(cb.equal(from.get(OPDDiagnostic_.quarter), quarter));
                group.add(from.get(OPDDiagnostic_.quarter));
            }
            if (month != null) {
                if (quarter == null) {
                    selection.add(cb.literal(0)); // add dummy value in order to full fill OPDResponse constructor
                }
                selection.add(from.get(OPDDiagnostic_.month));
                queryFilter.add(cb.equal(from.get(OPDDiagnostic_.month), month));
                group.add(from.get(OPDDiagnostic_.month));
            }

            selection.add(cb.sum(from.get(OPDDiagnostic_.value)));

            query.multiselect(selection.toArray(new Expression[selection.size()]));
            query.groupBy(group.toArray(new Expression[group.size()]));


            query.where(cb.and(queryFilter.toArray(new Predicate[queryFilter.size()])));
            return em.createQuery(query).getResultList();
        } else {
            return null;
        }
    }

    @Override
    public List<OPDResponse> getYearlyTotalValues(Facility f, Integer year, List<Long> ids) {
        if (ids.size() > 0) {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<OPDResponse> query = cb.createQuery(OPDResponse.class);
            Root<OPDDiagnostic> from = query.from(OPDDiagnostic.class);
            Join<OPDDiagnostic, DataElement> queryJoin = from.join(OPDDiagnostic_.diagnostic);


            query.multiselect(
                    from.get(OPDDiagnostic_.diagnostic),
                    cb.sum(from.get(OPDDiagnostic_.value)));

            query.groupBy(
                    from.get(OPDDiagnostic_.diagnostic));


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
    public List<OPDResponse> getQuarterlyTotalValues(Facility f, Integer year, Integer quarter, List<Long> ids) {
        if (ids.size() > 0) {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<OPDResponse> query = cb.createQuery(OPDResponse.class);
            Root<OPDDiagnostic> from = query.from(OPDDiagnostic.class);
            Join<OPDDiagnostic, DataElement> queryJoin = from.join(OPDDiagnostic_.diagnostic);


            query.multiselect(
                    from.get(OPDDiagnostic_.diagnostic),
                    cb.sum(from.get(OPDDiagnostic_.value)));


            query.groupBy(from.get(OPDDiagnostic_.diagnostic));


            List<Predicate> queryFilter = new ArrayList();
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.facility), f));
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.year), year));

            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.quarter), quarter));
            queryFilter.add(queryJoin.get(DataElement_.id).in(ids));

            query.where(cb.and(queryFilter.toArray(new Predicate[queryFilter.size()])));
            return em.createQuery(query).getResultList();
        } else {
            return null;
        }
    }

    @Override
    public List<OPDResponse> getMonthlyTotalValues(Facility f, Integer year, Integer month, List<Long> ids) {
        if (ids.size() > 0) {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<OPDResponse> query = cb.createQuery(OPDResponse.class);
            Root<OPDDiagnostic> from = query.from(OPDDiagnostic.class);
            Join<OPDDiagnostic, DataElement> queryJoin = from.join(OPDDiagnostic_.diagnostic);


            query.multiselect(
                    from.get(OPDDiagnostic_.diagnostic),
                    cb.sum(from.get(OPDDiagnostic_.value)));


            query.groupBy(from.get(OPDDiagnostic_.diagnostic));


            List<Predicate> queryFilter = new ArrayList();
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.facility), f));
            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.year), year));

            queryFilter.add(cb.equal(from.get(OPDDiagnostic_.month), month));
            queryFilter.add(queryJoin.get(DataElement_.id).in(ids));

            query.where(cb.and(queryFilter.toArray(new Predicate[queryFilter.size()])));
            return em.createQuery(query).getResultList();
        } else {
            return null;
        }
    }


}

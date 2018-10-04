package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.response.RMNCHResponse;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class RMNCHRepositoryImpl implements RMNCHRepositoryCustom {


    @PersistenceContext
    private EntityManager em;

    public List<RMNCHResponse> getRMNCH(Facility f, Integer year, Integer quarter, Integer month) {
        return getRMNCH(f, year, quarter, month, null);
    }

    @Override
    public List<RMNCHResponse> getRMNCHByWard(Ward w, Integer year, Integer quarter, Integer month) {
        return getRMNCHByWard(w, year, quarter, month, null);
    }

    @Override
    public List<RMNCHResponse> getRMNCH(Facility f, Integer year, Integer quarter, Integer month, DataElement dataElement) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<RMNCHResponse> query = cb.createQuery(RMNCHResponse.class);

        Root<RMNCH> from = query.from(RMNCH.class);
        Join<RMNCH, DataElement> queryJoin = from.join(RMNCH_.indicator);

        List<Expression> selection = new ArrayList();
        List<Expression> group = new ArrayList();

        List<Predicate> queryFilter = new ArrayList();
        queryFilter.add(cb.equal(from.get(RMNCH_.facility), f));
        queryFilter.add(cb.equal(from.get(RMNCH_.year), year));


        selection.add(from.get(RMNCH_.indicator));

        selection.add(from.get(RMNCH_.year));

        group.add(from.get(RMNCH_.indicator));
        group.add(from.get(RMNCH_.year));


        if (quarter != null) {
            selection.add(from.get(RMNCH_.quarter));
            queryFilter.add(cb.equal(from.get(RMNCH_.quarter), quarter));
            group.add(from.get(RMNCH_.quarter));
        }
        if (month != null) {
            if (quarter == null) {
                selection.add(cb.literal(0)); // add dummy value in order to full fill OPDResponse constructor
            }
            selection.add(from.get(RMNCH_.month));
            queryFilter.add(cb.equal(from.get(RMNCH_.month), month));
            group.add(from.get(RMNCH_.month));
        }

        selection.add(cb.sum(from.get(RMNCH_.value)));

        query.multiselect(selection.toArray(new Expression[selection.size()]));
        query.groupBy(group.toArray(new Expression[group.size()]));

        if (dataElement != null) {
            queryFilter.add(cb.equal(from.get(RMNCH_.indicator), dataElement));
        }


        query.where(cb.and(queryFilter.toArray(new Predicate[queryFilter.size()])));
        return em.createQuery(query).getResultList();

    }

    @Override
    public List<RMNCHResponse> getRMNCHByWard(Ward w, Integer year, Integer quarter, Integer month, DataElement dataElement) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<RMNCHResponse> query = cb.createQuery(RMNCHResponse.class);

        Root<RMNCH> from = query.from(RMNCH.class);
        Join<RMNCH, DataElement> queryJoin = from.join(RMNCH_.indicator);

        List<Expression> selection = new ArrayList();
        List<Expression> group = new ArrayList();

        List<Predicate> queryFilter = new ArrayList();
        queryFilter.add(cb.equal(from.get(RMNCH_.ward), w));
        queryFilter.add(cb.equal(from.get(RMNCH_.year), year));


        selection.add(from.get(RMNCH_.indicator));

        selection.add(from.get(RMNCH_.year));

        group.add(from.get(RMNCH_.indicator));
        group.add(from.get(RMNCH_.year));


        if (quarter != null) {
            selection.add(from.get(RMNCH_.quarter));
            queryFilter.add(cb.equal(from.get(RMNCH_.quarter), quarter));
            group.add(from.get(RMNCH_.quarter));
        }
        if (month != null) {
            if (quarter == null) {
                selection.add(cb.literal(0)); // add dummy value in order to full fill OPDResponse constructor
            }
            selection.add(from.get(RMNCH_.month));
            queryFilter.add(cb.equal(from.get(RMNCH_.month), month));
            group.add(from.get(RMNCH_.month));
        }

        selection.add(cb.sum(from.get(RMNCH_.value)));

        query.multiselect(selection.toArray(new Expression[selection.size()]));
        query.groupBy(group.toArray(new Expression[group.size()]));

        if (dataElement != null) {
            queryFilter.add(cb.equal(from.get(RMNCH_.indicator), dataElement));
        }


        query.where(cb.and(queryFilter.toArray(new Predicate[queryFilter.size()])));
        return em.createQuery(query).getResultList();
    }


    public void deleteUsingRegion(Long id, Integer year) {
        Query q = em.createNativeQuery("DELETE FROM rmnch s " +
                " USING " +
                " facility f ,boundary as ward , boundary as district, boundary as region " +
                " where s.facility_id=f.id" +
                " and f.ward_gid=ward.gid " +
                " and ward.district_gid=district.gid " +
                " and district.region_gid=region.gid " +
                " and region.gid =? and s.year=?");
        q.setParameter(1, id);
        q.setParameter(2, year);
        q.executeUpdate();
    }

}

package org.devgateway.rdi.tanzania.repositories;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 * @author Sebastian Dimunzio
 */


public class ServiceAreaPopulationRepositoryImpl implements ServiceAreaPopulationRepositoryCustom {

    @PersistenceContext
    EntityManager em;

    @Override
    public void deleteUsingRegion(Long id) {
        Query q = em.createNamedQuery("deleteByRegionId");
        q.setParameter(1, id);
        q.executeUpdate();
    }
}

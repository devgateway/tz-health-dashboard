package org.devgateway.rdi.tanzania.controllers;


import org.devgateway.rdi.tanzania.Constants;
import org.devgateway.rdi.tanzania.domain.Dimension;
import org.devgateway.rdi.tanzania.repositories.DimensionRepository;
import org.devgateway.rdi.tanzania.response.Conf;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@RestController
@CrossOrigin("*")
public class ConfigController {

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    DimensionRepository dimensionRepository;

    @RequestMapping("/conf")
    @Cacheable("configuration")
    public Conf getYearRange() {

        HashSet<Integer> years = new HashSet<>();
        List<Integer> ys = entityManager.createNativeQuery("select distinct year from rmnch").getResultList();

        for (Object year : ys) {
            years.add((Integer) year);
        }

        ys = entityManager.createNativeQuery("select distinct year  from opddiagnostic").getResultList();

        for (Object year : ys) {
            years.add((Integer) year);
        }

        Conf conf = new Conf();
        conf.setYears(new ArrayList<>(years));

        Dimension d = dimensionRepository.findOneByDhis2Id(Constants.DETEAILED_TYPE_DIMENSION);
        conf.setDetailedTypes(d.getItems());
        return conf;

    }
}

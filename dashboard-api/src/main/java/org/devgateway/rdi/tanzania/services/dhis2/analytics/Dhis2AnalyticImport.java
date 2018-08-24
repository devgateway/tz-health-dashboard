package org.devgateway.rdi.tanzania.services.dhis2.analytics;

import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.repositories.RegionRepository;
import org.devgateway.rdi.tanzania.repositories.WardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Service

public abstract class Dhis2AnalyticImport<T> {

    @PersistenceContext
    EntityManager entityManager;

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2AnalyticImport.class);

    @Autowired
    RegionRepository regionRepository;


    @Autowired
    WardRepository wardRepository;

    public enum Grouping {
        REGION,
        DISTRICT,
        WARD
    }

    public List<T> fullyImport(Grouping grouping) {
        List<T> data = new ArrayList<>();
        List<Region> regions = regionRepository.findAll();

        regions.forEach(region -> data.addAll(byRegion(region, grouping)));
        return data;
    }

    public List<T> byRegion(String name, Grouping grouping) {
        Region region = regionRepository.findOneByName(name);
        return byRegion(region, grouping);

    }


    public List<T> byRegion(Region region, Grouping grouping) {
        List<T> data = new ArrayList<>();
        LOGGER.info("Processing region " + region.getName());
        if (grouping.equals(Grouping.DISTRICT) || grouping.equals(Grouping.WARD)) {
            region.getDistricts().forEach(district -> {
                data.addAll(byDistrict(district, grouping));
            });
        } else {
            List<Facility> facilities = new ArrayList<>();
            region.getDistricts().forEach(district -> district.getWards().forEach(ward -> facilities.addAll(ward.getFacilities())));
            data.addAll(byFacilities(facilities));
        }
        return data;
    }


    public List<T> byDistrict(District district, Grouping grouping) {
        List<T> data = new ArrayList<>();
        LOGGER.info("Processing district " + district.getName());

        List<Ward> wards = wardRepository.findByDistrict(district);


        if (grouping.equals(Grouping.WARD)) {
            wards.forEach(ward -> data.addAll(byWard(ward)));
        } else {
            List<Facility> facilities = new ArrayList<>();
            wards.forEach(ward -> facilities.addAll(ward.getFacilities()));
            data.addAll(byFacilities(facilities));

        }
        return data;
    }

    public List<T> byWard(Ward ward) {
        List<T> data = new ArrayList<>();
        LOGGER.info("Processing ward " + ward.getName());
        byFacilities(ward.getFacilities());
        return data;
    }


    public abstract List<T> byFacilities(List<Facility> facilities);

    public abstract void clean();
}

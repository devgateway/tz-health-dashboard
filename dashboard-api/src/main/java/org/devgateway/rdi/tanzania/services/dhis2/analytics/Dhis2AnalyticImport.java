package org.devgateway.rdi.tanzania.services.dhis2.analytics;

import org.devgateway.rdi.tanzania.dhis.analytics.QueryDimension;
import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.repositories.DistrictRepository;
import org.devgateway.rdi.tanzania.repositories.FacilityRepository;
import org.devgateway.rdi.tanzania.repositories.RegionRepository;
import org.devgateway.rdi.tanzania.repositories.WardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author Sebastian Dimunzio
 */

@Service
@Transactional
public abstract class Dhis2AnalyticImport<T> {

    @PersistenceContext
    EntityManager entityManager;

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2AnalyticImport.class);

    static Integer MAX_FACILITIES_TO_REQUEST = 100;

    @Autowired
    RegionRepository regionRepository;

    @Autowired
    DistrictRepository districtRepository;


    @Autowired
    WardRepository wardRepository;

    @Autowired
    FacilityRepository facilityRepository;


    public enum Grouping {
        REGION,
        DISTRICT,
        WARD
    }


    public List<T> byFacility(Facility facility, QueryDimension period) {
        List<Facility> facilities = new ArrayList<>();
        facilities.add(facility);
        return byFacilities(facilities, period);
    }

    public List<T> fullyImport(Grouping grouping, QueryDimension period) {
        List<T> data = new ArrayList<>();
        List<Region> regions = regionRepository.findAll();
        //parallel stream
        regions.parallelStream().forEach(region -> data.addAll(byRegion(region, grouping, period)));
        return data;
    }

    public List<T> byRegion(String name, Grouping grouping, QueryDimension period) {
        Region region = regionRepository.findOneByName(name);
        return byRegion(region, grouping, period);

    }

    public List<T> byRegion(Region region, Grouping grouping, QueryDimension period) {
        List<T> data = new ArrayList<>();
        LOGGER.info("> Processing region " + region.getName());
        if (grouping.equals(Grouping.DISTRICT) || grouping.equals(Grouping.WARD)) {

            region.getDistricts().parallelStream().forEach(district -> {
                data.addAll(byDistrict(district, grouping, period));
            });
        } else {
            List<Facility> facilities = new ArrayList<>();
            region.getDistricts().forEach(district -> {
                district.getWards().forEach(ward -> {
                    facilities.addAll(ward.getFacilities());
                });

            });

            data.addAll(byFacilities(facilities, period));
        }
        return data;
    }


    public List<T> byDistrict(District district, Grouping grouping, QueryDimension period) {
        List<T> data = new ArrayList<>();
        LOGGER.info(">> Processing district " + district.getName());

        Set<Ward> wards = wardRepository.findByDistrict(district);


        if (grouping.equals(Grouping.WARD)) {
            wards.forEach(ward -> data.addAll(byWard(ward, period)));
        } else {
            List<Facility> facilities = new ArrayList<>();


            wards.forEach(ward -> {
                facilities.addAll(ward.getFacilities());
            });


            data.addAll(byFacilities(facilities, period));

        }
        return data;
    }

    public List<T> byWard(Ward ward, QueryDimension period) {
        List<T> data = new ArrayList<>();
        LOGGER.info(">>> Processing ward " + ward.getName());
        List<Facility> facilities = facilityRepository.findByWard(ward);
        byFacilities(facilities, period);
        return data;
    }


    public List<T> byFacilities(List<Facility> facilities, QueryDimension period) {
        LOGGER.info(facilities.size() + " facilities should be processed");
        List<T> results = new ArrayList<>();

        List<Facility> facilityToProcess = new ArrayList<>();
        List<Facility> pending = new ArrayList<>();

        if (facilities.size() > MAX_FACILITIES_TO_REQUEST) {
            for (Integer i = 0; i < facilities.size(); i++) {
                if (i < MAX_FACILITIES_TO_REQUEST) {
                    facilityToProcess.add(facilities.get(i));
                } else {
                    pending.add(facilities.get(i));
                }
            }
        }

        if (facilityToProcess.size() == 0) {
            facilityToProcess.addAll(facilities);
        }

        results.addAll(_byFacilities(facilityToProcess, period));

        if (pending.size() > 0) {
            results.addAll(byFacilities(pending, period));
        }


        return results;


    }

    public abstract List<T> _byFacilities(List<Facility> facilities, QueryDimension period);


}

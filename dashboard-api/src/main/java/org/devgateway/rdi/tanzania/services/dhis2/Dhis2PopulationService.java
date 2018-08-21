package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.dhis.analytics.QueryBuilder;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryDimension;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryUtil;
import org.devgateway.rdi.tanzania.dhis.analytics.results.AnalyticsResultsTable;
import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.repositories.*;
import org.hisp.dhis.Dhis2;
import org.hisp.dhis.Dhis2Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Service
@Transactional
public class Dhis2PopulationService {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2PopulationService.class);

    @Autowired
    Dhis2Config dhis2Config;


    @Autowired
    DimensionRepository dimensionRepository;

    @Autowired
    DataElementRepository dataElementRepository;

    @Autowired
    FacilityGroupRepository facilityGroupRepository;

    @Autowired
    DistrictRepository districtRepository;

    @Autowired
    RegionRepository regionRepository;

    @Autowired
    FacilityRepository facilityRepository;

    @Autowired
    ServiceAreaPopulationRepository serviceAreaPopulation;

    public void clean() {
        serviceAreaPopulation.deleteAll();
    }


    public List<ServiceAreaPopulation> importPopulation() {
        List<ServiceAreaPopulation> populations = new ArrayList<>();
        List<Region> regions = regionRepository.findAll();
        regions.forEach(region -> {
                    LOGGER.info("Importing region " + region.getName());
                    populations.addAll(importPopulationByRegion(region));
                }
        );

        return populations;
    }


    public List<ServiceAreaPopulation> importPopulationByRegionName(String name) {
        Region r = regionRepository.findOneByName(name);
        return importPopulationByRegion(r);
    }

    public List<ServiceAreaPopulation> importPopulationByRegion(Region region) {
        List<ServiceAreaPopulation> populations = new ArrayList<>();
        region.getDistricts().forEach(district -> {
            LOGGER.info("Importing district " + region.getName());
            populations.addAll(importPopulationByDistrict(district));
        });
        return populations;
    }


    public List<ServiceAreaPopulation> importPopulationByDistrict(District district) {
        List<ServiceAreaPopulation> populations = new ArrayList<>();
        district.getWards().forEach(ward -> populations.addAll(importPopulationByWard(ward)));
        return populations;
    }


    public List<ServiceAreaPopulation> importPopulationByWard(Ward ward) {
        LOGGER.info("Importing district " + ward.getName());
        List<ServiceAreaPopulation> populations = new ArrayList<>();
        Dhis2 dhis2 = new Dhis2(dhis2Config);

        //8713;"ykShMtNgDB1";"Idadi ya Watu"
        DataElement population = dataElementRepository.findOneByDhis2Id("ykShMtNgDB1");
        //"hENn80Fmmlf";"Jinsi"
        Dimension gender = dimensionRepository.findOneByDhis2Id("hENn80Fmmlf");

        //727;"Cow9nZikDgD";"Age Population"
        Dimension age = dimensionRepository.findOneByDhis2Id("Cow9nZikDgD");

        QueryDimension ageDimension = new QueryDimension(age.getDhis2Id(), age.getName());

        ageDimension.setItems(QueryUtil.items2Items(age.getItems()));

        QueryDimension dx = QueryUtil.dxDimension(QueryUtil.dataElement2Item(population));

        QueryDimension genderDimension = new QueryDimension(gender.getDhis2Id(), gender.getName());
        genderDimension.setItems(QueryUtil.items2Items(gender.getItems()));


        //wards
        List<org.devgateway.rdi.tanzania.dhis.analytics.Item> items = new ArrayList<>();
        ward.getFacilities().stream().forEach(facility -> {
            items.add(QueryUtil.org2Item(facility));
        });


        if (items.size() > 0) {
            //Org Units Facilities
            QueryDimension ouDimension = QueryUtil.ouDimension(items);

            LOGGER.info("Getting data of "
                    + ouDimension.getItems().size()
                    + " Facilities");

            //URL Builder
            QueryBuilder queryBuilder = QueryBuilder.geInstance()
                    .addDimension(dx)
                    .addDimension(genderDimension)
                    .addDimension(ageDimension)
                    .addDimension(QueryUtil.LAST_5_YEARS())
                    .addDimension(ouDimension);

            try {

                AnalyticsResultsTable results = dhis2.getObject(queryBuilder.build(), AnalyticsResultsTable.class);

                LOGGER.info("Got " + results.getRows().size() + " - "
                        + ward.getDistrict().getRegion().getName() + " - "
                        + ward.getDistrict().getName() + " - "
                        + ward.getDistrict().getName() + " - " + ward.getName());

                results.getRows().forEach(row -> {
                    Double value = Double.parseDouble(row[5]);
                    String genderValue = results.getMetaData().getItems().get(row[1]).getName();
                    String ageValue = results.getMetaData().getItems().get(row[2]).getName();
                    String year = row[3];
                    Facility facility = facilityRepository.findOneByDhis2Id(row[4]);
                    ServiceAreaPopulation p = new ServiceAreaPopulation();
                    p.setFacility(facility);
                    p.setValue(value);
                    p.setAge(ageValue);
                    p.setGender(genderValue);
                    p.setYear(Integer.valueOf(year));

                    populations.add(p);
                });

            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        serviceAreaPopulation.save(populations);
        return populations;
    }
}

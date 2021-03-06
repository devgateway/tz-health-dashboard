package org.devgateway.rdi.tanzania.services.dhis2.analytics;

import org.devgateway.rdi.tanzania.dhis.analytics.Item;
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
public class Dhis2PopulationService extends Dhis2AnalyticImport<ServiceAreaPopulation> {

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
    ServiceAreaPopulationRepository serviceAreaPopulationRepository;


    @Autowired
    ItemRepository itemRepository;


    public void clean(Region region,Integer year) {
        serviceAreaPopulationRepository.deleteUsingRegion(region.getGid(),year);

    }


    @Override
    public List<ServiceAreaPopulation> _byFacilities(List<Facility> list, QueryDimension period) {
        List<ServiceAreaPopulation> populations = new ArrayList<>();
        Dhis2 dhis2 = new Dhis2(dhis2Config);

        //8713;"ykShMtNgDB1";"Idadi ya Watu"
        DataElement population = dataElementRepository.findOneByDhis2Id("ykShMtNgDB1");
        //"hENn80Fmmlf";"Jinsi"
        Dimension gender = dimensionRepository.findOneByDhis2Id("hENn80Fmmlf");
        //727;"Cow9nZikDgD";"Age Population"
        Dimension age = dimensionRepository.findOneByDhis2Id("Cow9nZikDgD");

        QueryDimension ageDimension = new QueryDimension(age.getDhis2Id(), age.getName());
        ageDimension.setItems(QueryUtil.items2Items(new ArrayList<>(age.getItems())));
        QueryDimension dx = QueryUtil.dxDimension(QueryUtil.dataElement2Item(population));
        QueryDimension genderDimension = new QueryDimension(gender.getDhis2Id(), gender.getName());
        genderDimension.setItems(QueryUtil.items2Items(new ArrayList<>(gender.getItems())));


        List<Item> items = QueryUtil.org2sItems(list);

        if (items.size() > 0) {

            QueryDimension ouDimension = QueryUtil.ouDimension(items);

            LOGGER.info("Getting Population of "
                    + ouDimension.getItems().size()
                    + " Facilities");

            //URL Builder
            QueryBuilder queryBuilder = QueryBuilder.geInstance()
                    .addDimension(dx)
                    .addDimension(genderDimension)
                    .addDimension(ageDimension)
                    .addDimension(period)
                    .addDimension(ouDimension);


            AnalyticsResultsTable results = dhis2.getObject(queryBuilder.build(), AnalyticsResultsTable.class);

            results.getRows().forEach(row -> {
                try {

                    Double value = Double.parseDouble(row[5]);
                    String year = row[3];
                    Facility facility = facilityRepository.findOneByDhis2Id(row[4]);
                    ServiceAreaPopulation p = new ServiceAreaPopulation();
                    p.setFacility(facility);
                    p.setValue(value);

                    p.setYear(Integer.valueOf(year));

                    p.setGender(itemRepository.findByDhis2Id(row[1]));

                    p.setAge(itemRepository.findByDhis2Id(row[2]));

                    populations.add(p);
                } catch (Exception e) {
                    LOGGER.error("Error while processing record");
                }
            });


        }


        serviceAreaPopulationRepository.save(populations);
        return populations;
    }
}

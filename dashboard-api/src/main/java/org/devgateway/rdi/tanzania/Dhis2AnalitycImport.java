package org.devgateway.rdi.tanzania;

import org.devgateway.rdi.tanzania.dhis.analytics.QueryBuilder;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryDimension;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryUtil;
import org.devgateway.rdi.tanzania.dhis.analytics.results.AnalyticsResultsTable;
import org.devgateway.rdi.tanzania.domain.DataElement;
import org.devgateway.rdi.tanzania.domain.Dimension;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.repositories.*;
import org.hisp.dhis.Dhis2;
import org.hisp.dhis.Dhis2Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.webservices.WebServicesAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Configuration
@ComponentScan
@EnableAutoConfiguration(exclude = {WebServicesAutoConfiguration.class})
@ComponentScan(excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, value = {Dhis2Import.class, Application.class})})

@Transactional
public class Dhis2AnalitycImport implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2AnalitycImport.class);

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


    public void importPopuationData() {
        Dhis2 dhis2 = new Dhis2(dhis2Config);
        Region region = regionRepository.findOneByName("Dar es salaam");

        //8713;"ykShMtNgDB1";"Idadi ya Watu"
        DataElement population = dataElementRepository.findOneByDhis2Id("ykShMtNgDB1");
        //727;"Cow9nZikDgD";"Age Population"
        Dimension age = dimensionRepository.findOneByDhis2Id("Cow9nZikDgD");

        /*
        "h8JRv8POdfy";"< 1"
        "LBipXEMD6mq";"1-4"
        "c5LtGjbHKgf";"Miaka 5-9"
        "aZcKJ9XxvaF";"10 -14"
        "FfN1mqXvpR7";"15-49"
        "HKU7NijIEIH";"50 - 60"
        "p1b4SYcdjJw";"60+"
        */


        QueryDimension ageDimension = new QueryDimension(age.getDhis2Id(), age.getName());

        ageDimension.setItems(QueryUtil.items2Items(age.getItems()));

        QueryDimension dx = QueryUtil.dxDimension(QueryUtil.dataElement2Item(population));


        region.getDistricts().forEach(district -> {
            //districts
            district.getWards().forEach(ward -> {
                //wards
                List<org.devgateway.rdi.tanzania.dhis.analytics.Item> items = new ArrayList<>();
                ward.getFacilities().stream().forEach(facility -> {
                    //facilities
                    items.add(QueryUtil.org2Item(facility));
                });
                //Org Units Facilities
                QueryDimension ouDimension = QueryUtil.ouDimension(items);

                LOGGER.info(district.getName() + " -> " + ward.getName()
                        + " -> Getting data of "
                        + ouDimension.getItems().size()
                        + " Facilities");

                //URL Builder
                QueryBuilder queryBuilder = QueryBuilder.geInstance()
                        .addDimension(dx)
                        .addDimension(ageDimension)
                        .addDimension(QueryUtil.LAST_12_MONTHS())
                        .addDimension(ouDimension);

                AnalyticsResultsTable results = dhis2.getObject(queryBuilder.build(), AnalyticsResultsTable.class);

            });
        });

    }


    @Override
    public void run(String... strings) {
        this.importPopuationData();
        System.exit(3);
    }


    public static void main(String[] args) throws Exception {
        new SpringApplicationBuilder(Dhis2AnalitycImport.class).web(false).build().run(args);
    }

}

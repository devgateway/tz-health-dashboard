package org.devgateway.rdi.tanzania;

import org.devgateway.rdi.tanzania.dhis.analytics.QueryBuilder;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryDimension;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryUtil;
import org.devgateway.rdi.tanzania.domain.DataElement;
import org.devgateway.rdi.tanzania.domain.Dimension;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.repositories.*;
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


        // List<District> districts = districtRepository.findByName("Kinondoni");

        Region region = regionRepository.findOneByName("Dar es salaam");

        //8713;"ykShMtNgDB1";"Idadi ya Watu"
        DataElement population = dataElementRepository.findOneByDhis2Id("ykShMtNgDB1");


        //727;"Cow9nZikDgD";"Age Population"
        Dimension age = dimensionRepository.findOneByDhis2Id("Cow9nZikDgD");


        /*
        Dimension items
                "h8JRv8POdfy";"< 1"
                "LBipXEMD6mq";"1-4"
                "c5LtGjbHKgf";"Miaka 5-9"
                "aZcKJ9XxvaF";"10 -14"
                "FfN1mqXvpR7";"15-49"
                "HKU7NijIEIH";"50 - 60"
                "p1b4SYcdjJw";"60+"
        */

        age.getItems().forEach(item -> {
            LOGGER.info(item.getDhis2Id());
        });


        QueryDimension dx = new QueryDimension("dx", "Data");
        dx.adItem(population.getDhis2Id(), population.getName());

        //Age as column with all items
        QueryDimension ageColumn = new QueryDimension(age.getDhis2Id(), "Age");
        ageColumn.setItems(QueryUtil.items2Items(age.getItems()));


        QueryDimension periodRow = new QueryDimension("pe", "Period");
        periodRow.adItem("LAST_12_MONTHS", "LAST_12_MONTHS");


        QueryDimension orgFilter = new QueryDimension("ou", "Org Unit");


        //Facility[] facilities=new Facility[10];


        region.getDistricts().forEach(district -> {
            district.getWards().forEach(ward -> {
                ward.getFacilities().stream().forEach(facility -> {

                    orgFilter.adItem(QueryUtil.org2Item(facility));
                });

                LOGGER.info(district.getName() + "->" + ward.getName() + "-> Getting data of " + orgFilter.getItems().size() + " Facilities");

                QueryBuilder queryBuilder = QueryBuilder.geInstance()
                        .addColumn(dx)
                        .addColumn(ageColumn)
                        .addRow(periodRow)
                        .addFilter(orgFilter);

                LOGGER.info(queryBuilder.build());
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

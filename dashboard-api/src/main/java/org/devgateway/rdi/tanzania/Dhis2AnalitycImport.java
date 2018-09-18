package org.devgateway.rdi.tanzania;

import org.devgateway.rdi.tanzania.dhis.analytics.QueryUtil;
import org.devgateway.rdi.tanzania.repositories.FacilityRepository;
import org.devgateway.rdi.tanzania.repositories.OPDDiagnosticRepository;
import org.devgateway.rdi.tanzania.repositories.RegionRepository;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2AnalyticImport;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2OPDDiagnosesService;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2PopulationService;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2RMNNCHService;
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

/**
 * @author Sebastian Dimunzio
 */

@Configuration
@ComponentScan
@EnableAutoConfiguration(exclude = {WebServicesAutoConfiguration.class})
@ComponentScan(excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, value = {Dhis2MetadataImport.class, Application.class})})

public class Dhis2AnalitycImport implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2AnalitycImport.class);

    @Autowired
    Dhis2PopulationService dhis2PopulationService;

    @Autowired
    Dhis2OPDDiagnosesService dhis2OPDDiagnosesService;

    @Autowired
    Dhis2RMNNCHService dhis2RMNNCHService;

    @Autowired
    RegionRepository regionRepository;

    @Autowired
    OPDDiagnosticRepository opdDiagnosticRepository;

    @Autowired
    FacilityRepository facilityRepository;

    public void importData() {
        LOGGER.info("........................STARTING ........................");
        dhis2PopulationService.clean();
        dhis2PopulationService.byRegion("Dodoma", Dhis2AnalyticImport.Grouping.DISTRICT, QueryUtil.Y(2016, 2017));

        dhis2OPDDiagnosesService.clean();
        dhis2OPDDiagnosesService.byRegion("Dodoma", Dhis2AnalyticImport.Grouping.WARD,
                QueryUtil.MONTHS_OFF(2017, 2016, 2015));

        dhis2RMNNCHService.clean();
        dhis2RMNNCHService.byRegion("Dodoma", Dhis2AnalyticImport.Grouping.DISTRICT,
                QueryUtil.MONTHS_OFF(2017, 2016, 2015));

        LOGGER.info("........................ALL DONE ........................");

    }


    @Override
    public void run(String... strings) {
        this.importData();
        System.exit(3);
    }


    public static void main(String[] args) throws Exception {
        new SpringApplicationBuilder(Dhis2AnalitycImport.class).web(false).build().run(args);
    }

}

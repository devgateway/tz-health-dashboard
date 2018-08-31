package org.devgateway.rdi.tanzania;

import org.devgateway.rdi.tanzania.dhis.analytics.QueryUtil;
import org.devgateway.rdi.tanzania.repositories.FacilityRepository;
import org.devgateway.rdi.tanzania.repositories.OPDDiagnosticRepository;
import org.devgateway.rdi.tanzania.repositories.RegionRepository;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2AnalyticImport;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2OPDDiagnosesService;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2PopulationService;
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
    Dhis2PopulationService populationService;

    @Autowired
    Dhis2OPDDiagnosesService dhis2OPDDiagnosesService;

    @Autowired
    RegionRepository regionRepository;

    @Autowired
    OPDDiagnosticRepository opdDiagnosticRepository;

    @Autowired
    FacilityRepository facilityRepository;

    public void importPopuationData() {
        populationService.clean();
        populationService.byRegion("Dodoma", Dhis2AnalyticImport.Grouping.DISTRICT, QueryUtil.Y2017());

        dhis2OPDDiagnosesService.clean();
        dhis2OPDDiagnosesService.byRegion("Dodoma", Dhis2AnalyticImport.Grouping.DISTRICT, QueryUtil.MONTHS_OFF(2016));
        dhis2OPDDiagnosesService.byRegion("Dodoma", Dhis2AnalyticImport.Grouping.DISTRICT, QueryUtil.MONTHS_OFF(2017));


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

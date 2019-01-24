package org.devgateway.rdi.tanzania;

import org.apache.commons.cli.*;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryUtil;
import org.devgateway.rdi.tanzania.domain.ImportLog;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.repositories.FacilityRepository;
import org.devgateway.rdi.tanzania.repositories.ImportLogRepository;
import org.devgateway.rdi.tanzania.repositories.OPDDiagnosticRepository;
import org.devgateway.rdi.tanzania.repositories.RegionRepository;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2AnalyticImport;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2OPDDiagnosesService;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2PopulationService;
import org.devgateway.rdi.tanzania.services.dhis2.analytics.Dhis2RMNCHService;
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

import java.util.Date;

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
    RegionRepository regionRepository;

    @Autowired
    Dhis2PopulationService dhis2PopulationService;

    @Autowired
    Dhis2OPDDiagnosesService dhis2OPDDiagnosesService;

    @Autowired
    Dhis2RMNCHService dhis2RMNNCHService;

    @Autowired
    OPDDiagnosticRepository opdDiagnosticRepository;

    @Autowired
    FacilityRepository facilityRepository;

    @Autowired
    ImportLogRepository importLogRepository;


    public void population(Region region, Integer year, boolean incremental) {
        if (!incremental) {
            dhis2PopulationService.clean(region, year);
        }
        dhis2PopulationService.byRegion(region, Dhis2AnalyticImport.Grouping.DISTRICT,
                QueryUtil.Y(year));
    }

    public void OPDDiagnoses(Region region, Integer year, boolean incremental) {

        if (!incremental) {
            dhis2OPDDiagnosesService.clean(region, year);
        }
        dhis2OPDDiagnosesService.byRegion(region, Dhis2AnalyticImport.Grouping.DISTRICT,
                QueryUtil.MONTHS_OFF(year));
    }


    public void RMNNCH(Region region, Integer year, boolean incremental) {
        if (incremental) {
            dhis2RMNNCHService.clean(region, year);
        }
        dhis2RMNNCHService.byRegion(region, Dhis2AnalyticImport.Grouping.DISTRICT, QueryUtil.MONTHS_OFF(year));
    }


    public void importData(Region region, Integer year, Boolean incremental) {
        population(region, year, incremental);
        OPDDiagnoses(region, year, incremental);
        RMNNCH(region, year, incremental);
        LOGGER.info("........................ALL DONE ........................");
    }


    @Override
    public void run(String... strings) {
        CommandLineParser parser = new DefaultParser();
        Options options = new Options();
        options.addOption("c", false, "Clean");
        options.addOption("r", true, "Region");
        options.addOption("y", true, "Year");
        options.addOption("d", true, "Data");
        CommandLine cmd = null;
        Boolean incremental = true;
        ImportLog importLog = new ImportLog();
        try {

            cmd = parser.parse(options, strings);
            if (cmd.hasOption("r") && cmd.hasOption("y")) {
                Region region = regionRepository.findOneByName(cmd.getOptionValue('r'));
                Integer year = Integer.parseInt(cmd.getOptionValue("y"));
                if (region == null) {
                    System.out.println("......................................");
                    System.out.println(".                                     .");
                    System.out.println(".                                     .");
                    System.out.println(". Please provide a valid region name  .");
                    System.out.println(".                                     .");
                    System.out.println(".                                     .");
                    System.out.println(".......................................");
                } else {

                    String data = cmd.getOptionValue("d");
                    if (cmd.hasOption("c")) {
                        incremental = false;
                    }

                    importLog.setRegion(region);
                    importLog.setStartDate(new Date());
                    importLog.setYear(year);
                    importLog.setIncremental(incremental);
                    importLog.setData(cmd.getOptionValue("d"));

                    if (!cmd.hasOption("d")) {
                        this.importData(region, year, incremental);

                    } else {
                        if (data.toUpperCase().indexOf("PO") > -1) {
                            this.population(region, year, incremental);
                        }
                        if (data.toUpperCase().indexOf("OP") > -1) {
                            this.OPDDiagnoses(region, year, incremental);
                        }
                        if (data.toUpperCase().indexOf("RM") > -1) {
                            this.RMNNCH(region, year, incremental);
                        }
                    }

                    importLog.setStatus("OK");
                    importLogRepository.save(importLog);

                }
            } else {
                System.out.println("......................................");
                System.out.println(".                                     .");
                System.out.println(".                                     .");
                System.out.println(". Please provide region name and year .");
                System.out.println(".                                     .");
                System.out.println(".                                     .");
                System.out.println(".......................................");
            }


        } catch (ParseException e) {
            importLog.setStatus("ERROR");
            importLogRepository.save(importLog);
            LOGGER.error(e.getMessage(), e);
        }

        System.exit(3);
    }


    public static void main(String[] args) throws Exception {
        new SpringApplicationBuilder(Dhis2AnalitycImport.class).web(false).build().run(args);
    }

}

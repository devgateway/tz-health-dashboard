package org.devgateway.rdi.tanzania;

import org.devgateway.rdi.tanzania.domain.Diagnostic;
import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.repositories.DiagnosticRepository;
import org.devgateway.rdi.tanzania.repositories.WardRepository;
import org.devgateway.rdi.tanzania.services.Dhis2DiagnosesService;
import org.devgateway.rdi.tanzania.services.Dhis2OrgUnitService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.webservices.WebServicesAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;

import javax.annotation.PreDestroy;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@SpringBootApplication

/*
 * Gets organizaition Unit
 * */
@EnableAutoConfiguration(exclude = {WebServicesAutoConfiguration.class})
public class Dhis2Import implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2Import.class);

    @Autowired
    private ConfigurableApplicationContext context;

    @Autowired
    Dhis2OrgUnitService dhis2Facility;

    @Autowired
    Dhis2DiagnosesService dhis2DiagnosesService;

    @Autowired
    WardRepository wardRepository;

    @Autowired
    DiagnosticRepository diagnosticRepository;

    public void facilitiesImport() throws Exception {
        List<Facility> facilities = dhis2Facility.getOrgUnitsList();
        LOGGER.info("Got " + facilities.size() + " Facilities");
        facilities.forEach(facility -> {
            //LOGGER.info("Getting ward by point for facility " + f.getName());
            Ward ward = wardRepository.findWardByPoint(facility.getPoint());

            if (ward != null) {
                facility.setWard(ward);
                LOGGER.info("Ward found was" + ward.getName());
            } else {
                LOGGER.warn("No war found for " + facility.getCode() + " - " + facility.getName()
                        + "  with coordinates (" + facility.getPoint().toText() + ")");
            }
        });

    }


    public void diagnosisImport() throws Exception {
        List<Diagnostic> diagnostics = dhis2DiagnosesService.getDiagnoses();
        diagnosticRepository.save(diagnostics);
    }

    @Override
    public void run(String... strings) throws Exception {
        diagnosisImport();

    }


    public static void main(String[] args) throws Exception {
        ApplicationContext applicationContext = SpringApplication.run(Dhis2Import.class, args);
        int exitValue = SpringApplication.exit(applicationContext);
        System.exit(exitValue);

    }

    @PreDestroy
    public void onDestroy() throws Exception {
        System.out.println("Spring Container is destroyed!");
    }


}

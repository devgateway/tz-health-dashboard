package org.devgateway.rdi.tanzania;

import org.devgateway.rdi.tanzania.services.dhis2.Dhis2MetaDataImportService;
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

/**
 * @author Sebastian Dimunzio
 */

@SpringBootApplication
@EnableAutoConfiguration(exclude = {WebServicesAutoConfiguration.class})

public class Dhis2Import implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2Import.class);


    @Autowired
    Dhis2MetaDataImportService dhis2MetaDataImportService;


    @Autowired
    private ConfigurableApplicationContext context;

    @Override
    public void run(String... strings) throws Exception {
        dhis2MetaDataImportService.orgUnitsRelatedDimensionsImport();
        dhis2MetaDataImportService.diagnosisImport();
        dhis2MetaDataImportService.orgUnitsGroupsImport();
        dhis2MetaDataImportService.orgUnitsImport();
        System.exit(3);
    }


    public static void main(String[] args) throws Exception {
        ApplicationContext applicationContext = SpringApplication.run(Dhis2Import.class, args);
    }

    @PreDestroy
    public void onDestroy() throws Exception {
        System.out.println("Spring Container is destroyed!");
    }

}

package org.devgateway.rdi.tanzania;

import org.devgateway.rdi.tanzania.services.dhis2.MetaDataImportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.webservices.WebServicesAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;

import javax.annotation.PreDestroy;

/**
 * @author Sebastian Dimunzio
 */


@Configuration
@ComponentScan
@EnableAutoConfiguration(exclude = {WebServicesAutoConfiguration.class})
@ComponentScan(excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, value = {Application.class, Dhis2AnalitycImport.class})})

public class Dhis2MetadataImport implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2MetadataImport.class);

    @Autowired
    MetaDataImportService dhis2MetaDataImportService;

    @Autowired
    private ConfigurableApplicationContext context;


    @Override

    public void run(String... strings) {
        dhis2MetaDataImportService.clean();
        dhis2MetaDataImportService.importMetadata();
        System.exit(3);
    }


    public static void main(String[] args) throws Exception {
        new SpringApplicationBuilder(Dhis2MetadataImport.class).web(false).logStartupInfo(false).build().run(args);
    }

    @PreDestroy
    public void onDestroy() throws Exception {
        System.out.println("Spring Container is destroyed!");
    }

}

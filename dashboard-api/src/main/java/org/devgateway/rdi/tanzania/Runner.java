package org.devgateway.rdi.tanzania;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * Created by Sebastian Dimunzio on 11/6/2017.
 */
@Component
public class Runner implements ApplicationRunner {

    private static final Logger logger = LogManager.getLogger(ApplicationRunner.class);

    @Override
    public void run(ApplicationArguments applicationArguments) {
        runInit();
    }


    @Value("${spring.jpa.hibernate.ddl-auto}")
    String dllAuto;


    /**
     * Use this function to initially populate the database.
     */
    private void runInit() {
        if (this.dllAuto != null && ((this.dllAuto.equalsIgnoreCase("CREATE")) ||
                (this.dllAuto.toUpperCase().equalsIgnoreCase("CREATE-DROP")))) {
            logger.info("Adding some data into database");

        }
    }
}

package org.devgateway.rdi.tanzania;

import com.opencsv.CSVReader;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.devgateway.rdi.tanzania.domain.Translation;
import org.devgateway.rdi.tanzania.repositories.TranslationRepository;
import org.devgateway.rdi.tanzania.services.dhis2.MetaDataImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Created by Sebastian Dimunzio on 11/6/2017.
 */
@Component
public class Runner implements ApplicationRunner {

    private static String BOUNDARIES_SH_FILE = "/data/load_data.sh";
    private final String CSV_FILE = "/data/translations.csv";


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
    @Autowired
    MetaDataImportService metaDataImportService;

    private void runInit() {
        if (this.dllAuto != null && ((this.dllAuto.equalsIgnoreCase("CREATE")) ||
                (this.dllAuto.toUpperCase().equalsIgnoreCase("CREATE-DROP")))) {
            logger.info("Adding some data into database");


            //
            String pdwPath = System.getenv().get("PWD");
            try {
                Process p = Runtime.getRuntime().exec(pdwPath + BOUNDARIES_SH_FILE);

                InputStream is = p.getInputStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String aux = br.readLine();

                while (aux != null) {
                    // Se escribe la linea en pantalla
                    System.out.println(aux);

                    // y se lee la siguiente.
                    aux = br.readLine();
                }


            } catch (Exception e) {
                e.printStackTrace();
            }


            loadTranslations();
            metaDataImportService.importMedata();
        }
    }

    @Autowired
    TranslationRepository translationRepository;

    private void loadTranslations() {
        String pdwPath = System.getenv().get("PWD");

        try (Reader reader = Files.newBufferedReader(Paths.get(pdwPath + CSV_FILE));
             CSVReader csvReader = new CSVReader(reader);) {
            // Reading Records One by One in a String array
            String[] nextRecord;
            csvReader.readNext();//skip headers;
            while ((nextRecord = csvReader.readNext()) != null) {
                String id = nextRecord[0];
                String original = nextRecord[2];
                String english = nextRecord[3];
                String swahili = nextRecord[4];

                translationRepository.save(new Translation(id, original, english, swahili));

            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}

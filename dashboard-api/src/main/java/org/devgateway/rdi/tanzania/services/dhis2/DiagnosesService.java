package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.dhis.Dhis2Paginator;
import org.devgateway.rdi.tanzania.dhis.pojo.Dhis2Object;
import org.devgateway.rdi.tanzania.domain.Diagnostic;
import org.geojson.FeatureCollection;
import org.hisp.dhis.Dhis2;
import org.hisp.dhis.query.Filter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@SpringBootApplication

/*
 * Gets organizaition Unit
 * */

@Component
public class DiagnosesService extends Dhis2Service {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureCollection.class);


    public List<Diagnostic> getDiagnoses() throws Exception {
        List<Diagnostic> allResults = new ArrayList<>();
        Dhis2 dhis2 = new Dhis2(dhis2Config);
        List<Filter> filters = new ArrayList<>();
        filters.add(Filter.eq("dataElementGroups.id", "jfnNzTy6eUL"));

        Dhis2Paginator dhis2Paginator =
                new Dhis2Paginator("/29/dataElements.json", filters, 50, dhis2);

        while (dhis2Paginator.hasNext()) {
            List<Dhis2Object> singleObjects = dhis2Paginator.next().getDataElements();
            for (Dhis2Object s : singleObjects) {
                allResults.add(new Diagnostic(s.getId(), s.getDisplayName()));
            }
        }

        return allResults;
    }

}

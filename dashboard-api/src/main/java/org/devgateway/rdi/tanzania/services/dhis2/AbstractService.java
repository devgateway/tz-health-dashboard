package org.devgateway.rdi.tanzania.services.dhis2;

import org.hisp.dhis.Dhis2;
import org.hisp.dhis.Dhis2Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * @author Sebastian Dimunzio
 */

public class AbstractService {

    @Autowired
    Dhis2Config dhis2Config;

    protected <T> T getObjects(Class<T> klass, String basePath, boolean paging, String fields) {
        Dhis2 dhis2 = new Dhis2(dhis2Config);

        T results = dhis2.getObject(UriComponentsBuilder.fromPath(basePath)
                .queryParam("paging", paging)
                .queryParam("fields", fields)
                .toUriString(), klass);
        return results;
    }


}

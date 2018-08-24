package org.devgateway.rdi.tanzania.services.dhis2.metadata;

import org.hisp.dhis.Dhis2;
import org.hisp.dhis.Dhis2Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * @author Sebastian Dimunzio
 */
@Service
public class Dhis2Service {

    @Autowired
    Dhis2Config dhis2Config;

    public <T> T getObjects(Class<T> klass, String basePath, boolean paging, String fields) {
        Dhis2 dhis2 = new Dhis2(dhis2Config);

        T results = dhis2.getObject(UriComponentsBuilder.fromPath(basePath)
                .queryParam("paging", paging)
                .queryParam("fields", fields)
                .toUriString(), klass);
        return results;
    }


}

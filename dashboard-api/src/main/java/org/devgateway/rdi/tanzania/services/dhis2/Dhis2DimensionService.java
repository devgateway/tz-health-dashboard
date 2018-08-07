package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.dhis.pojo.Results;
import org.devgateway.rdi.tanzania.domain.orgs.DetailedOwnership;
import org.devgateway.rdi.tanzania.domain.orgs.DetailedType;
import org.devgateway.rdi.tanzania.domain.orgs.Ownership;
import org.devgateway.rdi.tanzania.domain.orgs.Type;
import org.geojson.FeatureCollection;
import org.hisp.dhis.Dhis2;
import org.hisp.dhis.Dhis2Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */
@Service
public class Dhis2DimensionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureCollection.class);


    @Autowired
    Dhis2Config dhis2Config;


    private static String PATH = "/29/dimensions/";

    private static String TYPE_DIMENSION_ID = "VG4aAdXA4JI";

    private static String DETAILED_TYPE_DIMENSION_ID = "X4NKFlvMewI";

    private static String OWNERSHIP_DIMENSION_ID = "IymWT9V0HZI";

    private static String DETAILED_OWNERSHIP_DIMENSION_ID = "EaSVpHl8C4J";


    public Results getDimension(String key) {
        Dhis2 dhis2 = new Dhis2(dhis2Config);

        Results results = dhis2.getObject(UriComponentsBuilder.fromPath(PATH)
                .pathSegment(key)
                .pathSegment("items.json")
                .toUriString(), Results.class);
        return results;
    }

    public List<Type> getTypes() {
        List<Type> types = getDimension(TYPE_DIMENSION_ID).getDataElements().stream()
                .map(singleObject -> new Type(singleObject.getId(), singleObject.getDisplayName())
                ).collect(Collectors.toList());

        return types;
    }

    public List<Ownership> getOwnerships() {
        List<Ownership> list = getDimension(OWNERSHIP_DIMENSION_ID).getDataElements().stream()
                .map(singleObject -> new Ownership(singleObject.getId(), singleObject.getDisplayName())).collect(Collectors.toList());
        return list;
    }

    public List<DetailedType> getDetailedTypes() {
        List<DetailedType> list = getDimension(DETAILED_TYPE_DIMENSION_ID).getDataElements().stream()
                .map(singleObject ->
                        new DetailedType(singleObject.getId(), singleObject.getDisplayName())
                ).collect(Collectors.toList());

        return list;
    }

    public List<DetailedOwnership> getDetailedOwnerships() {
        List<DetailedOwnership> list = getDimension(DETAILED_OWNERSHIP_DIMENSION_ID).getDataElements()
                .stream().map(singleObject ->
                        new DetailedOwnership(singleObject.getId(), singleObject.getDisplayName())
                ).collect(Collectors.toList());

        return list;
    }
}

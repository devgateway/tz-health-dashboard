package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.dhis.pojo.Results;
import org.devgateway.rdi.tanzania.dhis.pojo.dimensions.Dimensions;
import org.devgateway.rdi.tanzania.domain.Dimension;
import org.devgateway.rdi.tanzania.domain.Item;
import org.devgateway.rdi.tanzania.repositories.DimensionRepository;
import org.geojson.FeatureCollection;
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
public class DimensionService extends Dhis2Service {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureCollection.class);

    private static String PATH = "/29/dimensions/";

    @Autowired
    DimensionRepository dimensionRepository;


    public Results getDimensionItems(String key) {
        return getObjects(Results.class, UriComponentsBuilder.fromPath(PATH)
                .pathSegment(key)
                .pathSegment("items.json").toUriString(), false, "*");
    }


    public List<Dimension> getAllDimensions(final boolean includeItems) {

        Dimensions dhis2Dimensions = getObjects(Dimensions.class,
                UriComponentsBuilder.fromPath(PATH)
                        .toUriString(), false, "displayName,id");

        List<Dimension> dimensions = dhis2Dimensions.getDimensions().stream().map(dimension -> {
            Dimension d = new Dimension(dimension.getId(), dimension.getDisplayName());

            if (includeItems) {
                LOGGER.info("Getting dimensions items");
                List<Item> items = getDimensionItems(dimension.getId())
                        .getDataElements()
                        .stream().map(singleObject -> new Item(singleObject.getId(), singleObject.getDisplayName(), d))
                        .collect(Collectors.toList());
                d.setItems(items);

            }

            return d;

        }).collect(Collectors.toList());

        return dimensions;
    }

    public List<Dimension> save(List<Dimension> dimensions) {
        return dimensionRepository.save(dimensions);
    }

    public void cleanDimensions(){
        dimensionRepository.deleteAll();;
    }
}

package org.devgateway.rdi.tanzania.services.dhis2.metadata;

import org.devgateway.rdi.tanzania.dhis.pojo.Dhis2Object;
import org.devgateway.rdi.tanzania.dhis.pojo.Dimensions;
import org.devgateway.rdi.tanzania.dhis.pojo.MetaDataResponse;
import org.devgateway.rdi.tanzania.domain.Dimension;
import org.devgateway.rdi.tanzania.domain.Item;
import org.devgateway.rdi.tanzania.repositories.DimensionRepository;
import org.devgateway.rdi.tanzania.repositories.ItemRepository;
import org.geojson.FeatureCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
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

    @Autowired
    ItemRepository itemRepository;


    public MetaDataResponse getDimensionItems(String key) {
        return getObjects(MetaDataResponse.class, UriComponentsBuilder.fromPath(PATH)
                .pathSegment(key)
                .pathSegment("items.json").toUriString(), false, "*");
    }


    public List<Dimension> getAllDimensions() {

        Dimensions dhis2Dimensions = getObjects(Dimensions.class, UriComponentsBuilder.fromPath(PATH).toUriString(), false, "displayName,id");

        HashMap<String, Item> cachedItems = new HashMap();

        List<Dimension> dimensions = dhis2Dimensions.getDimensions().stream().map(dimension -> {
            Dimension d = new Dimension(dimension.getId(), dimension.getDisplayName());
            return d;
        }).collect(Collectors.toList());

        return dimensions;
    }

    public List<Item> getDimensionItems(Dimension dimension) {
        LOGGER.info("Getting dimensions items");
        List<Dhis2Object> items = getDimensionItems(dimension.getDhis2Id()).getDataElements();
        return items.stream().map(dhis2Object -> new Item(dhis2Object.getId(), dhis2Object.getDisplayName())).collect(Collectors.toList());

    }


    public Dimension save(Dimension dimension) {
        return dimensionRepository.save(dimension);
    }

    public List<Dimension> save(List<Dimension> dimensions) {
        return dimensionRepository.save(dimensions);
    }

    public List<Item> saveItems(List<Item> items) {
        return itemRepository.save(items);
    }

    public void cleanDimensions() {
        dimensionRepository.deleteAll();

    }
}

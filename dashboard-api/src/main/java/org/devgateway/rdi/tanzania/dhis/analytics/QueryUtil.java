package org.devgateway.rdi.tanzania.dhis.analytics;

import org.devgateway.rdi.tanzania.domain.Facility;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

public class QueryUtil {

    public static Item item2Item(org.devgateway.rdi.tanzania.domain.Item item) {
        return new Item(item.getDhis2Id(), item.getName());
    }


    public static List<Item> items2Items(List<org.devgateway.rdi.tanzania.domain.Item> items) {
        return items.stream().map(item -> new Item(item.getDhis2Id(), item.getName())).collect(Collectors.toList());
    }


    public static Item dataElement2Item(org.devgateway.rdi.tanzania.domain.DataElement dataElement) {
        return new Item(dataElement.getDhis2Id(), dataElement.getName());
    }


    public static Item org2Item(Facility facility) {
        return new Item(facility.getDhis2Id(), facility.getName());
    }
}

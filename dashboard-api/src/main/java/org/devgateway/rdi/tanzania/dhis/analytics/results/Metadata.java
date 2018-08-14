package org.devgateway.rdi.tanzania.dhis.analytics.results;

import javafx.util.Pair;
import org.devgateway.rdi.tanzania.dhis.pojo.Dhis2Object;

import java.util.HashMap;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class Metadata {

    HashMap<String, List> dimensions;
    HashMap<String, NamedObject> items;

    public HashMap<String, List> getDimensions() {
        return dimensions;
    }

    public void setDimensions(HashMap<String, List> dimensions) {
        this.dimensions = dimensions;
    }

    public HashMap<String, NamedObject> getItems() {
        return items;
    }

    public void setItems(HashMap<String, NamedObject> items) {
        this.items = items;
    }
}

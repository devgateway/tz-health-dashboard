package org.devgateway.rdi.tanzania.dhis.analytics;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class QueryDimension {

    private String dimension;
    private String name;
    private List<Item> items;


    public QueryDimension(String dimension, String name) {
        this.dimension = dimension;
        this.name = name;
    }


    public String getDimension() {
        return dimension;
    }

    public void setDimension(String dimension) {
        this.dimension = dimension;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }


    public QueryDimension adItem(String id, String name) {
        if (this.items == null) {
            this.items = new ArrayList<>();
        }
        this.items.add(new Item(id, name));
        return this;
    }

    public QueryDimension adItem(Item item) {
        if (this.items == null) {
            this.items = new ArrayList<>();
        }
        this.items.add(item);
        return this;
    }
}

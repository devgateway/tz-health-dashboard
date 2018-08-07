package org.devgateway.rdi.tanzania.dhis.pojo;

/**
 * @author Sebastian Dimunzio
 */

public class OrgUnitGroup {

    String displayName;
    String id;
    String dimensionItem;

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDimensionItem() {
        return dimensionItem;
    }

    public void setDimensionItem(String dimensionItem) {
        this.dimensionItem = dimensionItem;
    }
}

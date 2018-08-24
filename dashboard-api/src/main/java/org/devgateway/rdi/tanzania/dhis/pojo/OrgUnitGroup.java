package org.devgateway.rdi.tanzania.dhis.pojo;

import org.devgateway.rdi.tanzania.dhis.pojo.Dhis2Object;

/**
 * @author Sebastian Dimunzio
 */

public class OrgUnitGroup extends Dhis2Object {

    String dimensionItem;

    public String getDimensionItem() {
        return dimensionItem;
    }

    public void setDimensionItem(String dimensionItem) {
        this.dimensionItem = dimensionItem;
    }
}

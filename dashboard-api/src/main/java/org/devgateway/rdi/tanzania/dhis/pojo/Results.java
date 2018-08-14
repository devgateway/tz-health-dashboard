package org.devgateway.rdi.tanzania.dhis.pojo;

import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class Results {


    List<Dhis2Object> dataElements;

    public List<Dhis2Object> getDataElements() {
        return dataElements;
    }

    public void setDataElements(List<Dhis2Object> dataElements) {
        this.dataElements = dataElements;
    }


    @JsonSetter("items")
    public void setItems(List<Dhis2Object> items) {
        this.dataElements = items;
    }

    @JsonSetter("dataElementGroups")
    public void setDataElementGroups(List<Dhis2Object> dataElementGroups) {
        this.dataElements = dataElementGroups;
    }

}

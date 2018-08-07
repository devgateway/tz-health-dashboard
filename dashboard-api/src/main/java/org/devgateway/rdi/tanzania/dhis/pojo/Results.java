package org.devgateway.rdi.tanzania.dhis.pojo;

import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class Results {


    List<SingleObject> dataElements;

    public List<SingleObject> getDataElements() {
        return dataElements;
    }

    public void setDataElements(List<SingleObject> dataElements) {
        this.dataElements = dataElements;
    }


    @JsonSetter("items")
    public void setItems(List<SingleObject> dataElements) {
        this.dataElements = dataElements;
    }

}

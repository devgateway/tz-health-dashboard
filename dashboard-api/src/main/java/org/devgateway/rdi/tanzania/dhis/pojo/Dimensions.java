package org.devgateway.rdi.tanzania.dhis.pojo;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.devgateway.rdi.tanzania.dhis.pojo.Dhis2Object;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class Dimensions {

    ArrayList<Dhis2Object> dimensions;

    public ArrayList<Dhis2Object> getDimensions() {
        return dimensions;
    }

    public void setDimensions(ArrayList<Dhis2Object> dimensions) {
        this.dimensions = dimensions;
    }
}

package org.devgateway.rdi.tanzania.dhis.pojo.deprecated;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.vividsolutions.jts.geom.Point;
import org.hisp.dhis.model.OrgUnit;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class OrgUnitExtended extends OrgUnit {

    @JsonDeserialize(using = CoordinatesDeserializer.class)
    List<Double> coordinates;

    Point point;

    public List<Double> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }
}

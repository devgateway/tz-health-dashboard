package org.devgateway.rdi.tanzania.geojson;

import com.bedatadriven.jackson.datatype.jts.GeoJson;
import org.devgateway.geo.GeoJsonUtils;
import org.devgateway.rdi.tanzania.domain.Boundary;
import org.geojson.Feature;

/**
 * @author Sebastian Dimunzio
 */

public class BoundaryTrasnfomer {


    public static Feature transform(Boundary boundary) {
        Feature f = new Feature();
        f.setProperty("ID", boundary.getGid());
        f.setProperty("NAME", boundary.getName());
        f.setGeometry(GeoJsonUtils.jtsGeometryToGeoJson(boundary.getGeom()));
        return f;
    }
}

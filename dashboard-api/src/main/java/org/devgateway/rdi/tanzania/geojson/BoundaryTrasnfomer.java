package org.devgateway.rdi.tanzania.geojson;

import org.devgateway.geo.GeoJsonUtils;
import org.devgateway.rdi.tanzania.domain.Boundary;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.geojson.Feature;

/**
 * @author Sebastian Dimunzio
 */

public class BoundaryTrasnfomer {


    public static Feature transform(Boundary boundary, boolean includePopulation) {
        Feature f = new Feature();
        f.setProperty("ID", boundary.getGid());
        f.setProperty("NAME", boundary.getName());
        f.setGeometry(GeoJsonUtils.jtsGeometryToGeoJson(boundary.getGeom()));
        if (includePopulation) {
            f.setProperty("POPULAION", boundary.getPopulation());
            f.setProperty("POPULAION_FEMALE", boundary.getPopulationFemale());
            f.setProperty("POPULAION_MALE", boundary.getPopulationMale());
  
        }
        return f;
    }


    public static Feature transform(Ward boundary, boolean includePopulation) {
        Feature f = new Feature();
        f.setProperty("ID", boundary.getGid());
        f.setProperty("NAME", boundary.getName());
        if (includePopulation) {
            f.setProperty("POPULAION", boundary.getPopulation());
            f.setProperty("POPULAION_FEMALE", boundary.getPopulationFemale());
            f.setProperty("POPULAION_MALE", boundary.getPopulationMale());
            f.setProperty("POPULAION_RURAL", boundary.getPopulationRural());
            f.setProperty("POPULAION_RURAL_FEMALE", boundary.getPopulationRuralFemale());
            f.setProperty("POPULAION_RURAL_MALE", boundary.getPopulationRuralFemale());

        }
        f.setGeometry(GeoJsonUtils.jtsGeometryToGeoJson(boundary.getGeom()));
        return f;
    }
}

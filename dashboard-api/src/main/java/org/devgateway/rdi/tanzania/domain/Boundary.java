package org.devgateway.rdi.tanzania.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vividsolutions.jts.geom.Geometry;

import javax.persistence.*;

/**
 * @author Sebastian Dimunzio
 */

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")

public abstract class Boundary {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    Long gid;

    @Column(insertable = false, updatable = false)
    private String dtype;

    String name;

    @JsonIgnore
    Geometry geom;
    Long shapeLeng;
    Long shapeArea;
    Long population;
    Long populationFemale;
    Long populationMale;
    String source;

    public Long getGid() {
        return gid;
    }

    public String getDtype() {
        return dtype;
    }

    public String getName() {
        return name;
    }

    public Geometry getGeom() {
        return geom;
    }

    public Long getShapeLeng() {
        return shapeLeng;
    }

    public Long getShapeArea() {
        return shapeArea;
    }

    public Long getPopulation() {
        return population;
    }

    public Long getPopulationFemale() {
        return populationFemale;
    }

    public Long getPopulationMale() {
        return populationMale;
    }

    public String getSource() {
        return source;
    }
}

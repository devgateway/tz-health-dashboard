package org.devgateway.rdi.tanzania.domain;

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
    Geometry geom;
    Long shapeLeng;
    Long shapeArea;
    Long population;
    Long populationFemale;
    Long populationMale;
    String source;
}

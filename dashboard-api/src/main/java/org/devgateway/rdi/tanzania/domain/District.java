package org.devgateway.rdi.tanzania.domain;

import com.vividsolutions.jts.geom.Geometry;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class District {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    private Long id;
    private Geometry geometry;

}

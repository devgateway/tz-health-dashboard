package org.devgateway.rdi.tanzania.domain;

import com.vividsolutions.jts.geom.Geometry;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * @author Sebastian Dimunzio
 */
@Entity
public class Ward   {
    @javax.persistence.Id
    protected Long id;
    protected Geometry geometry;


}

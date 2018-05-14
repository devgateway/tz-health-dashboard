package org.devgateway.rdi.tanzania.domain;

import com.vividsolutions.jts.geom.Geometry;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * @author Sebastian Dimunzio
 */

@Entity
@DiscriminatorValue("DISTRICT")
public class District extends Boundary {

    @ManyToOne(targetEntity = Region.class)
    Region region;

    public District() {
    }


    public District(Long gid, Geometry geom, String name) {
        this.gid=gid;
        this.geom=geom;
        this.name=name;
    }




}

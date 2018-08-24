package org.devgateway.rdi.tanzania.domain;

import com.vividsolutions.jts.geom.Geometry;

import javax.persistence.*;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Entity
@DiscriminatorValue("DISTRICT")

@NamedEntityGraph(name = "wardsJoin", attributeNodes = @NamedAttributeNode("wards"))
public class District extends Boundary {


    @ManyToOne(targetEntity = Region.class)
    Region region;

    public District() {
    }


    @OneToMany(targetEntity = Ward.class, mappedBy = "district")
    List<Ward> wards;

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public List<Ward> getWards() {
        return wards;
    }

    public void setWards(List<Ward> wards) {
        this.wards = wards;
    }

    public District(Long gid, Geometry geom, String name) {
        this.gid = gid;
        this.geom = geom;
        this.name = name;
    }


}

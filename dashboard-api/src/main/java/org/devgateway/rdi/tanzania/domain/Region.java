package org.devgateway.rdi.tanzania.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vividsolutions.jts.geom.Geometry;

import javax.persistence.*;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@Entity
@DiscriminatorValue("REGION")
@NamedEntityGraph(name = "districtsJoin", attributeNodes = @NamedAttributeNode("districts"))


public class Region extends Boundary {

    public Region() {
    }

    public Region(Long gid, Geometry geom, String name) {
        this.gid = gid;
        this.geom = geom;
        this.name = name;
    }

    @JsonIgnore
    @OneToMany(targetEntity = District.class, mappedBy = "region")
    List<District> districts;

    public List<District> getDistricts() {
        return districts;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }
}

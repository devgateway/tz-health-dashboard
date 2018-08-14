package org.devgateway.rdi.tanzania.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@Entity
@DiscriminatorValue("REGION")
public class Region extends Boundary {

    @OneToMany(targetEntity = District.class, mappedBy = "region")
    List<District> districts;

    public List<District> getDistricts() {
        return districts;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }
}

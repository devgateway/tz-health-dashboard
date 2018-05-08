package org.devgateway.rdi.tanzania.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class District extends Boundary {

    @ManyToOne(targetEntity = Region.class)
    Region region;

}

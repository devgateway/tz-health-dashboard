package org.devgateway.rdi.tanzania.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * @author Sebastian Dimunzio
 */
@Entity
 @DiscriminatorValue("REGION")
public class Region extends Boundary {



}

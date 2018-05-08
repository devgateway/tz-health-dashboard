package org.devgateway.rdi.tanzania.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class Ward extends Boundary {

    @ManyToOne(targetEntity = District.class)
    District district;
    String division;
    String wardType;
    Long populationRural;
    Long populationRuralMale;
    Long populationRuralFemale;
    Long populationUrban;
    Long populationUrbanMale;
    Long populationUrbanFemale;


}

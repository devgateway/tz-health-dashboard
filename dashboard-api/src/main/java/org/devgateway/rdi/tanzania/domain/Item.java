package org.devgateway.rdi.tanzania.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;

/**
 * @author Sebastian Dimunzio
 */
@Entity
public class Item {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    Long id;
    String name;
    String dhis2Id;

    public Item(String dhis2Id, String name, Dimension dimension) {
        this.name = name;
        this.dhis2Id = dhis2Id;
        this.dimension = dimension;
    }

    public Item() {
    }

    @ManyToOne(targetEntity = Dimension.class)
    Dimension dimension;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDhis2Id() {
        return dhis2Id;
    }

    public void setDhis2Id(String dhis2Id) {
        this.dhis2Id = dhis2Id;
    }

    public Dimension getDimension() {
        return dimension;
    }

    public void setDimension(Dimension dimension) {
        this.dimension = dimension;
    }
}

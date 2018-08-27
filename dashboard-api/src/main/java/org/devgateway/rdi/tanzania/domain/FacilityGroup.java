package org.devgateway.rdi.tanzania.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class FacilityGroup {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    Long id;
    String dhis2Id;
    String name;

    @ManyToOne(targetEntity = Item.class, cascade = CascadeType.ALL)
    Item item;

    public FacilityGroup() {
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public FacilityGroup(String dhis2Id, String name) {
        this.dhis2Id = dhis2Id;
        this.name = name;
    }

    @JsonIgnore
    @ManyToMany(targetEntity = Facility.class, fetch = FetchType.LAZY)
    private List<Facility> facilities;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getDhis2Id() {
        return dhis2Id;
    }

    public void setDhis2Id(String dhis2Id) {
        this.dhis2Id = dhis2Id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public List<Facility> getFacilities() {
        return facilities;
    }

    public void setFacilities(List<Facility> facilities) {
        this.facilities = facilities;
    }
}

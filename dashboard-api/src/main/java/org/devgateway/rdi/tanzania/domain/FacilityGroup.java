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

    private Long id;
    private String dhis2Id;
    private String name;

    public FacilityGroup() {
    }

    @JsonIgnore
    @ManyToMany(targetEntity = Facility.class, fetch = FetchType.LAZY)
    private List<Facility> facilities;


    @ManyToOne(targetEntity = Item.class)
    Item item;

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

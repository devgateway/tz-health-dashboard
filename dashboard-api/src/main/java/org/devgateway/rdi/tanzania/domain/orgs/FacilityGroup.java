package org.devgateway.rdi.tanzania.domain.orgs;

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

    @OneToMany(targetEntity = Item.class)
    List<Item> item;

    public FacilityGroup() {
    }

    public FacilityGroup(String dhis2Id, String name) {
        this.dhis2Id = dhis2Id;
        this.name = name;
    }

    @ManyToMany(targetEntity = Facility.class, fetch = FetchType.LAZY)
    private List<Facility> facilities;


    public Long getId() {
        return id;
    }

    public List<Item> getItems() {
        return item;
    }

    public void setItems(List<Item> item) {
        this.item = item;
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

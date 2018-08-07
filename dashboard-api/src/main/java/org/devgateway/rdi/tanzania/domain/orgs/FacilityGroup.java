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

    public FacilityGroup() {
    }

    @ManyToMany(targetEntity = Facility.class, fetch = FetchType.LAZY)
    private List<Facility> facilities;

    @OneToMany(targetEntity = Dhis2Item.class, fetch = FetchType.LAZY)
    private List<Dhis2Item> items;


    public FacilityGroup(String dhis2Id, String name) {
        this.dhis2Id = dhis2Id;
        this.name = name;
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

    public List<Dhis2Item> getItems() {
        return items;
    }

    public void setItems(List<Dhis2Item> items) {
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

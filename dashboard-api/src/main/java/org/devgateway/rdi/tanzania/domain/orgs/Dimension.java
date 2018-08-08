package org.devgateway.rdi.tanzania.domain.orgs;

import javax.persistence.*;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class Dimension {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id

    private Long id;
    private String dhis2;
    private String name;

    @OneToMany(targetEntity = Item.class, mappedBy = "dimension", cascade = CascadeType.ALL)
    private List<Item> items;

    public Dimension() {
    }

    public Dimension(String dhis2, String name) {
        this.dhis2 = dhis2;
        this.name = name;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDhis2() {
        return dhis2;
    }

    public void setDhis2(String dhis2) {
        this.dhis2 = dhis2;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

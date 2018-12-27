package org.devgateway.rdi.tanzania.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Entity
@NamedEntityGraph(name = "itemJoin", attributeNodes = @NamedAttributeNode("items"))
public class Dimension {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id

    private Long id;
    private String dhis2Id;
    private String name;

    @JsonIgnore
    @ManyToMany(targetEntity = Item.class, cascade = CascadeType.ALL,fetch = FetchType.LAZY)

    @JoinTable(name = "dimension_items", joinColumns = @JoinColumn(name = "dimension_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))

    private List<Item> items;

    public Dimension() {
    }

    public Dimension(String dhis2Id, String name) {
        this.dhis2Id = dhis2Id;
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
}

package org.devgateway.rdi.tanzania.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

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

    public Item(String dhis2Id, String name) {
        this.name = name;
        this.dhis2Id = dhis2Id;
    }

    public Item() {
    }

    @JsonIgnore
    @ManyToMany(targetEntity = Dimension.class, cascade = CascadeType.MERGE)
    @JoinTable(name = "dimension_items", joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "dimension_id"))
    Set<Dimension> dimensions;

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


    public Set<Dimension> getDimensions() {
        return dimensions;
    }

    public void setDimensions(Set<Dimension> dimensions) {
        this.dimensions = dimensions;
    }

    public void addDimension(Dimension dimension) {
        if (this.dimensions == null) {
            this.dimensions = new HashSet<>();
        }
        this.dimensions.add(dimension);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return Objects.equals(dhis2Id, item.dhis2Id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(dhis2Id);
    }
}

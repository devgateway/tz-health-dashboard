package org.devgateway.rdi.tanzania.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@Entity
public class Item{

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
    @ManyToMany(targetEntity = Dimension.class)
    @JoinTable(name = "dimension_items", joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "dimension_id"))

    List<Dimension> dimensions;

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

    public List<Dimension> getDimensions() {
        return dimensions;
    }

    public void setDimensions(List<Dimension> dimensions) {
        this.dimensions = dimensions;
    }

    public void addDimension(Dimension dimension) {
        if (this.dimensions == null) {
            this.dimensions = new ArrayList<>();
        }
        this.dimensions.add(dimension);
    }


}

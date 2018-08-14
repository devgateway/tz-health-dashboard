package org.devgateway.rdi.tanzania.domain;

import javax.persistence.*;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class DataElementGroup {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    Long id;
    String dhis2Id;
    String name;

    public DataElementGroup() {
    }

    public DataElementGroup(String dhis2Id, String name) {
        this.dhis2Id = dhis2Id;
        this.name = name;
    }

    @OneToMany(targetEntity = DataElement.class, mappedBy = "dataElementGroup", cascade = CascadeType.ALL)
    List<DataElement> dataElements;

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

    public List<DataElement> getDataElements() {
        return dataElements;
    }

    public void setDataElements(List<DataElement> dataElements) {
        this.dataElements = dataElements;
    }
}

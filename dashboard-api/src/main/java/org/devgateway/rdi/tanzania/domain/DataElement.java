package org.devgateway.rdi.tanzania.domain;

import javax.persistence.*;

/**
 * @author Sebastian Dimunzio
 */
@Entity
public class DataElement {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    Long id;
    String dhis2Id;
    String name;

    @ManyToOne
    Translation translation;


    public DataElement() {
    }

    public DataElement(String dhis2Id, String name) {
        this.dhis2Id = dhis2Id;
        this.name = name;
    }

    @ManyToOne(targetEntity = DataElementGroup.class)
    DataElementGroup dataElementGroup;

    public DataElementGroup getDataElementGroup() {
        return dataElementGroup;
    }

    public void setDataElementGroup(DataElementGroup dataElementGroup) {
        this.dataElementGroup = dataElementGroup;
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

    public Translation getTranslation() {
        return translation;
    }

    public void setTranslation(Translation translation) {
        this.translation = translation;
    }
}

package org.devgateway.rdi.tanzania.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToMany(targetEntity = Translation.class)
    List<Translation> translations;


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

    public List<Translation> getTranslations() {
        return translations;
    }

    public void setTranslations(List<Translation> translations) {
        this.translations = translations;
    }


    public List<Translation> addTranslations(Translation t) {
        if (translations == null) {
            translations = new ArrayList<>();
        }
        translations.add(t);
        return translations;
    }

}

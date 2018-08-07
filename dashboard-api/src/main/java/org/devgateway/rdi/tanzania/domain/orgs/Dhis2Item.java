package org.devgateway.rdi.tanzania.domain.orgs;

import javax.persistence.*;

/**
 * @author Sebastian Dimunzio
 */

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dimension")
public abstract class Dhis2Item {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    Long id;
    String name;
    String dhis2Id;

    public Dhis2Item(String dhis2Id, String name) {
        this.name = name;
        this.dhis2Id = dhis2Id;
    }

    public Dhis2Item() {
    }


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
}

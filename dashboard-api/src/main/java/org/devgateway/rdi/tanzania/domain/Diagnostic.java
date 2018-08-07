package org.devgateway.rdi.tanzania.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

/**
 * @author Sebastian Dimunzio
 */
@Entity
public class Diagnostic {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    private Long id;

    private String dhis2id;
    private String name;


    public Diagnostic(String dhis2id, String name) {
        this.dhis2id = dhis2id;
        this.name = name;
    }

    public Diagnostic() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDhis2id() {
        return dhis2id;
    }

    public void setDhis2id(String dhis2id) {
        this.dhis2id = dhis2id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

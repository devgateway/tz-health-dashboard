package org.devgateway.rdi.tanzania.domain;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class Translation {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    private Long id;
    private String key;
    private String locale;
    private boolean provided;
    String value;

    public Translation() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public boolean isProvided() {
        return provided;
    }

    public void setProvided(boolean provided) {
        this.provided = provided;
    }
}

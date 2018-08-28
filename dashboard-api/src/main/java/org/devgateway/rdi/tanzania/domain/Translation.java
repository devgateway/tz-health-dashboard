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
    private String original;
    private String english;
    private String swahili;

    public Translation() {
    }

    public Translation(String key, String original, String english, String swahili) {
        this.key = key;
        this.original = original;
        this.english = english;
        this.swahili = swahili;
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

    public String getOriginal() {
        return original;
    }

    public void setOriginal(String original) {
        this.original = original;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public String getSwahili() {
        return swahili;
    }

    public void setSwahili(String swahili) {
        this.swahili = swahili;
    }
}

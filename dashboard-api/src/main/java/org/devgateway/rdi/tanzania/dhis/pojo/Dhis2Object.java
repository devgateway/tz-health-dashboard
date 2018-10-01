package org.devgateway.rdi.tanzania.dhis.pojo;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class Dhis2Object {

    String id;
    String displayName;

    List<Translation> translations;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public List<Translation> getTranslations() {
        return translations;
    }

    public void setTranslations(List<Translation> translations) {
        this.translations = translations;
    }
}
